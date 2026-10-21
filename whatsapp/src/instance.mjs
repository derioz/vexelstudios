import { openSync, closeSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

/** Host-local exclusive ownership; not a distributed lock or network-volume guarantee. */
export function acquireInstance(databasePath) {
  if (databasePath === ':memory:') return () => {};
  const path = `${databasePath}.lock`, token = randomUUID();
  for (let attempt = 0; attempt < 2; attempt++) {
    let fd;
    try {
      fd = openSync(path, 'wx', 0o600);
      writeFileSync(fd, JSON.stringify({ pid: process.pid, token }));
      closeSync(fd); fd = undefined;
      return () => {
        if (JSON.parse(readFileSync(path, 'utf8')).token === token) unlinkSync(path);
      };
    } catch (error) {
      if (fd !== undefined) closeSync(fd);
      if (error.code !== 'EEXIST') throw error;
      let owner;
      try { owner = JSON.parse(readFileSync(path, 'utf8')); } catch { throw new Error('database_in_use: inspect lock file before recovery'); }
      if (!Number.isSafeInteger(owner.pid) || owner.pid < 1) throw new Error('database_in_use: invalid lock owner');
      try { process.kill(owner.pid, 0); } catch (probeError) {
        if (probeError.code === 'ESRCH') { unlinkSync(path); continue; }
      }
      throw new Error('database_in_use');
    }
  }
  throw new Error('database_in_use');
}
