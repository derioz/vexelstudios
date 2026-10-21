import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { acquireInstance } from './instance.mjs';

/** Single-process SQLite store. All critical state transitions are synchronous transactions. */
export function openStore(path, { now = Date.now, historyLimit = 20, retentionDays = 30, outboundMonthlyLimit = 900 } = {}) {
  if (!Number.isSafeInteger(outboundMonthlyLimit) || outboundMonthlyLimit < 1) throw new Error('Invalid outbound monthly limit');
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const release = acquireInstance(path);
  let db;
  try {
  db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS conversations (contactId TEXT PRIMARY KEY, mode TEXT NOT NULL DEFAULT 'auto', revision INTEGER NOT NULL DEFAULT 0, lastInboundAt INTEGER NOT NULL DEFAULT 0, summary TEXT NOT NULL DEFAULT '', reason TEXT NOT NULL DEFAULT '', updatedAt INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS events (seq INTEGER PRIMARY KEY, id TEXT UNIQUE NOT NULL, contactId TEXT NOT NULL, payload TEXT NOT NULL, status TEXT NOT NULL, createdAt INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS messages (seq INTEGER PRIMARY KEY, contactId TEXT NOT NULL, role TEXT NOT NULL, text TEXT NOT NULL, createdAt INTEGER NOT NULL, eventId TEXT);
    CREATE TABLE IF NOT EXISTS sends (eventId TEXT PRIMARY KEY, contactId TEXT NOT NULL, status TEXT NOT NULL, text TEXT NOT NULL, metaId TEXT, createdAt INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS quotas (day TEXT NOT NULL, scope TEXT NOT NULL, count INTEGER NOT NULL, PRIMARY KEY(day,scope));
    CREATE TABLE IF NOT EXISTS monthly_sends (month TEXT PRIMARY KEY, count INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS messages_contact ON messages(contactId,seq);
    CREATE INDEX IF NOT EXISTS events_status ON events(status,seq);
    CREATE INDEX IF NOT EXISTS sends_meta ON sends(metaId);`);
  if (!db.prepare('PRAGMA table_info(messages)').all().some(column => column.name === 'eventId')) db.exec('ALTER TABLE messages ADD COLUMN eventId TEXT');
  const run = (sql, ...args) => db.prepare(sql).run(...args);
  const get = (sql, ...args) => db.prepare(sql).get(...args);
  const all = (sql, ...args) => db.prepare(sql).all(...args);
  const tx = fn => { db.exec('BEGIN IMMEDIATE'); try { const result = fn(); db.exec('COMMIT'); return result; } catch (e) { db.exec('ROLLBACK'); throw e; } };
  const ensure = contactId => run('INSERT OR IGNORE INTO conversations(contactId,updatedAt) VALUES (?,?)', contactId, now());
  const setMode = (contactId, mode, reason = '') => {
    if (!['auto', 'human'].includes(mode)) throw new Error('Invalid mode');
    ensure(contactId);
    run('UPDATE conversations SET mode=?,revision=revision+1,reason=?,updatedAt=? WHERE contactId=?', mode, reason, now(), contactId);
    return get('SELECT * FROM conversations WHERE contactId=?', contactId);
  };
  tx(() => {
    // Backfill legacy reservations on upgrade, without ever lowering a persisted
    // counter after retention removes old send rows. Safe to repeat on startup.
    run(`INSERT INTO monthly_sends(month,count)
      SELECT strftime('%Y-%m',createdAt / 1000,'unixepoch'),COUNT(*) FROM sends GROUP BY 1
      ON CONFLICT(month) DO UPDATE SET count=MAX(monthly_sends.count,excluded.count)`);
    for (const row of all("SELECT * FROM sends WHERE status='sending'")) {
      run("UPDATE sends SET status='uncertain' WHERE eventId=?", row.eventId);
      setMode(row.contactId, 'human', 'send_uncertain');
      run("UPDATE events SET status='done' WHERE id=?", row.eventId);
    }
    run("UPDATE events SET status='queued' WHERE status='processing'");
    run(`UPDATE events SET status='done'
      WHERE status='queued' AND json_extract(payload,'$.batchId') IS NOT NULL AND EXISTS (
        SELECT 1 FROM sends WHERE sends.eventId=json_extract(events.payload,'$.batchId')
          AND sends.status IN ('sent','failed','uncertain'))`);
  });
  const store = {
    ingest(event) {
      return tx(() => {
        if (get('SELECT id FROM events WHERE id=?', event.id)) return false;
        ensure(event.contactId);
        if (event.kind === 'manual') {
          const known = get('SELECT eventId FROM sends WHERE metaId=?', event.metaId || event.id.split(':').slice(1).join(':'));
          if (!known) setMode(event.contactId, 'human', 'manual_message');
        }
        const inbound = ['text', 'media'].includes(event.kind);
        const control = store.getConversation(event.contactId);
        const payload = { ...event, controlRevision: control.revision };
        run('INSERT INTO events(id,contactId,payload,status,createdAt) VALUES (?,?,?,?,?)', event.id, event.contactId, JSON.stringify(payload), inbound && control.mode === 'auto' ? 'queued' : 'done', now());
        if (inbound) {
          run('UPDATE conversations SET lastInboundAt=MAX(lastInboundAt,?),updatedAt=? WHERE contactId=?', event.timestamp, now(), event.contactId);
          if (event.kind === 'text') store.recordMessage(event.contactId, 'user', event.text.slice(0, 4000), event.id);
        }
        return true;
      });
    },
    claimNext({ now: currentTime = now(), debounceMs = 0, maxWaitMs = 0, isImmediate = () => false } = {}) {
      return tx(() => {
        const rows = all("SELECT * FROM events WHERE status='queued' ORDER BY json_extract(payload,'$.timestamp'),seq");
        const urgent = rows.find(row => isImmediate(JSON.parse(row.payload)));
        if (urgent) {
          run("UPDATE events SET status='processing' WHERE id=?", urgent.id);
          return { ...JSON.parse(urgent.payload), batchIds: [urgent.id] };
        }
        const deferredContacts = new Set();
        for (const row of rows) {
          let event = JSON.parse(row.payload);
          const immediate = isImmediate(event);
          if (deferredContacts.has(event.contactId) && !immediate) continue;
          let batchRows = [row];
          let text = event.text;
          if (event.kind === 'text' && debounceMs > 0 && !immediate) {
            const contactRows = rows.filter(candidate => {
              const queued = JSON.parse(candidate.payload);
              return queued.contactId === event.contactId && queued.kind === 'text' && !isImmediate(queued);
            }).sort((a, b) => a.createdAt - b.createdAt || a.seq - b.seq);
            const firstReceived = contactRows[0];
            const firstReceivedEvent = JSON.parse(firstReceived.payload);
            const deadline = firstReceived.createdAt + maxWaitMs;
            batchRows = contactRows.filter(candidate => {
              const queued = JSON.parse(candidate.payload);
              const sameBatch = firstReceivedEvent.batchId ? queued.batchId === firstReceivedEvent.batchId : !queued.batchId;
              return candidate.createdAt <= deadline && queued.controlRevision === firstReceivedEvent.controlRevision && sameBatch;
            })
              .sort((a, b) => {
                const left = JSON.parse(a.payload), right = JSON.parse(b.payload);
                return left.timestamp - right.timestamp || a.seq - b.seq;
              });
            const newestReceivedAt = batchRows.reduce((latest, candidate) => Math.max(latest, candidate.createdAt), 0);
            if (currentTime - firstReceived.createdAt < maxWaitMs && currentTime - newestReceivedAt < debounceMs) {
              deferredContacts.add(event.contactId);
              continue;
            }
            event = JSON.parse(batchRows[0].payload);
            text = batchRows.map(candidate => JSON.parse(candidate.payload).text).join('\n');
          }
          const batchIds = batchRows.map(candidate => candidate.id);
          const batchId = JSON.parse(batchRows[0].payload).batchId || batchRows[0].id;
          for (const candidate of batchRows) {
            const payload = { ...JSON.parse(candidate.payload), batchId };
            run("UPDATE events SET status='processing',payload=? WHERE id=?", JSON.stringify(payload), candidate.id);
          }
          return { ...event, text, batchIds };
        }
        return undefined;
      });
    },
    finish(id, status) { run('UPDATE events SET status=? WHERE id=?', status, id); },
    finishBatch(ids, status) {
      tx(() => { for (const id of ids) run('UPDATE events SET status=? WHERE id=?', status, id); });
    },
    getConversation(contactId) { return get('SELECT * FROM conversations WHERE contactId=?', contactId); },
    setMode,
    history(contactId, { beforeEventId } = {}) {
      if (!beforeEventId) return all('SELECT role,text FROM (SELECT seq,role,text FROM messages WHERE contactId=? ORDER BY seq DESC LIMIT ?) ORDER BY seq', contactId, historyLimit);
      const current = get('SELECT seq,payload FROM events WHERE id=?', beforeEventId);
      const timestamp = JSON.parse(current.payload).timestamp;
      return all(`SELECT role,text FROM (
        SELECT m.seq,m.role,m.text,COALESCE(json_extract(e.payload,'$.timestamp'),m.createdAt) logicalTime,
          COALESCE(e.seq,m.seq) eventOrder, CASE m.role WHEN 'user' THEN 0 ELSE 1 END roleOrder
        FROM messages m LEFT JOIN events e ON e.id=m.eventId
        WHERE m.contactId=? AND (m.eventId IS NULL OR (json_extract(e.payload,'$.timestamp') < ? OR (json_extract(e.payload,'$.timestamp') = ? AND e.seq < ?)))
        ORDER BY logicalTime DESC,eventOrder DESC,roleOrder DESC,m.seq DESC LIMIT ?)
        ORDER BY logicalTime,eventOrder,roleOrder,seq`, contactId, timestamp, timestamp, current.seq, historyLimit);
    },
    recordMessage(contactId, role, text, eventId = null) { run('INSERT INTO messages(contactId,role,text,createdAt,eventId) VALUES (?,?,?,?,?)', contactId, role, text, now(), eventId); },
    saveHandoff(contactId, summary) { run('UPDATE conversations SET summary=?,updatedAt=? WHERE contactId=?', summary.slice(0, 2000), now(), contactId); },
    listConversations() { return all('SELECT * FROM conversations ORDER BY updatedAt DESC LIMIT 200'); },
    hasSendBudget() {
      const month = new Date(now()).toISOString().slice(0, 7);
      return (get('SELECT count FROM monthly_sends WHERE month=?', month)?.count || 0) < outboundMonthlyLimit;
    },
    reserveReply(eventId, revision, text, { handoff = false } = {}) {
      return tx(() => {
        const event = get('SELECT * FROM events WHERE id=?', eventId);
        if (!event || get('SELECT eventId FROM sends WHERE eventId=?', eventId)) return false;
        const c = store.getConversation(event.contactId);
        if (c.revision !== revision || (!handoff && c.mode !== 'auto') || now() - c.lastInboundAt >= 86400000 || c.lastInboundAt > now()) return false;
        if (!store.hasSendBudget()) return false;
        run("INSERT INTO sends(eventId,contactId,status,text,createdAt) VALUES (?,?,'sending',?,?)", eventId, event.contactId, text, now());
        // Count every reservation, including handoffs and uncertain/rejected sends.
        // Retention cleanup must not restore this month's budget.
        run('INSERT INTO monthly_sends(month,count) VALUES (?,1) ON CONFLICT(month) DO UPDATE SET count=count+1', new Date(now()).toISOString().slice(0, 7));
        return true;
      });
    },
    completeSend(eventId, metaId, historyEventId = eventId) {
      tx(() => {
        const row = get('SELECT * FROM sends WHERE eventId=?', eventId);
        run("UPDATE sends SET status='sent',metaId=? WHERE eventId=?", metaId, eventId);
        store.recordMessage(row.contactId, 'assistant', row.text, historyEventId);
      });
    },
    failSend(eventId, outcome) {
      tx(() => {
        const row = get('SELECT * FROM sends WHERE eventId=?', eventId);
        run('UPDATE sends SET status=? WHERE eventId=?', outcome === 'rejected' ? 'failed' : 'uncertain', eventId);
        setMode(row.contactId, 'human', outcome === 'rejected' ? 'send_failed' : 'send_uncertain');
      });
    },
    getSend(eventId) { return get('SELECT * FROM sends WHERE eventId=?', eventId); },
    consumeQuota(contactId, contactLimit, globalLimit) {
      return tx(() => {
        const day = new Date(now()).toISOString().slice(0, 10);
        const count = scope => get('SELECT count FROM quotas WHERE day=? AND scope=?', day, scope)?.count || 0;
        if (count(contactId) >= contactLimit || count('*') >= globalLimit) return false;
        for (const scope of [contactId, '*']) run('INSERT INTO quotas(day,scope,count) VALUES (?,?,1) ON CONFLICT(day,scope) DO UPDATE SET count=count+1', day, scope);
        return true;
      });
    },
    prune() {
      const cutoff = now() - retentionDays * 86400000;
      tx(() => {
        run('DELETE FROM messages WHERE createdAt<?', cutoff);
        run("DELETE FROM sends WHERE createdAt<? AND status!='sending'", cutoff);
        run("DELETE FROM events WHERE createdAt<? AND status IN ('done','failed')", cutoff);
        run("UPDATE conversations SET summary='' WHERE updatedAt<?", cutoff);
        run('DELETE FROM quotas WHERE day<?', new Date(cutoff).toISOString().slice(0, 10));
      });
    },
    close() { db.close(); release(); },
  };
  return store;
  } catch (error) { db?.close(); release(); throw error; }
}
