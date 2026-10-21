$ErrorActionPreference = 'Stop'
$taskServiceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$taskDataRoot = Join-Path $taskServiceRoot 'data'
$taskNodePath = (Get-Command node.exe -ErrorAction Stop).Source
$taskCloudflaredPath = (Get-Command cloudflared.exe -ErrorAction Stop).Source
$taskTunnelConfig = Join-Path $taskDataRoot 'cloudflared.yml'
if (-not (Test-Path -LiteralPath $taskTunnelConfig)) { throw 'Missing local Cloudflare tunnel configuration' }
$taskMutex = [System.Threading.Mutex]::new($false, 'Local\VexelWhatsAppSupervisor')
$taskOwnsMutex = $false
$taskServer = $null
$taskTunnel = $null
try {
    try { $taskOwnsMutex = $taskMutex.WaitOne(0) } catch [System.Threading.AbandonedMutexException] { $taskOwnsMutex = $true }
    if (-not $taskOwnsMutex) { exit 0 }
    while ($true) {
        if ($null -eq $taskServer -or $taskServer.HasExited) {
            $taskServer = Start-Process -FilePath $taskNodePath -ArgumentList @('--env-file-if-exists=.env', 'src/server.mjs') -WorkingDirectory $taskServiceRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskDataRoot 'server.stdout.log') -RedirectStandardError (Join-Path $taskDataRoot 'server.stderr.log')
        }
        if ($null -eq $taskTunnel -or $taskTunnel.HasExited) {
            $taskTunnelArgs = @('tunnel', '--config', ('"' + $taskTunnelConfig + '"'), '--no-autoupdate', 'run')
            $taskTunnel = Start-Process -FilePath $taskCloudflaredPath -ArgumentList $taskTunnelArgs -WorkingDirectory $taskServiceRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskDataRoot 'tunnel.stdout.log') -RedirectStandardError (Join-Path $taskDataRoot 'tunnel.stderr.log')
        }
        @{ serverPid = $taskServer.Id; tunnelPid = $taskTunnel.Id; supervisorPid = $PID } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $taskDataRoot 'runtime.json')
        Start-Sleep -Seconds 15
    }
} finally {
    foreach ($taskChild in @($taskServer, $taskTunnel)) {
        if ($null -ne $taskChild -and -not $taskChild.HasExited) { Stop-Process -Id $taskChild.Id -ErrorAction SilentlyContinue }
    }
    if ($taskOwnsMutex) { $taskMutex.ReleaseMutex() }
    $taskMutex.Dispose()
}
