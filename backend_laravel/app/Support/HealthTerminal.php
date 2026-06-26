<?php

namespace App\Support;

class HealthTerminal
{
  /**
   * @param  array<string, mixed>  $report
   */
  public static function render(array $report): string
  {
    $db = $report['database'];
    $webApi = $report['webApi'];

    $lines = [
      self::statusLine($report['ok'], 'API REMATE PANEL', 'online'),
      self::statusLine(
        $db['ok'],
        'MySQL',
        $db['ok']
          ? "{$db['name']} ({$db['latencyMs']}ms)"
          : ($db['error'] ?? 'desconectado')
      ),
      '<span class="line muted">────────────────────────────────────────────────────────</span>',
      self::infoLine('Servicio', 'lotes-backend-laravel v1.0.0'),
      self::infoLine('Laravel', e($report['laravelVersion'])),
      self::infoLine('PHP', e($report['phpVersion'])),
      self::infoLine('Entorno', e($report['environment'])),
      self::infoLine('App URL', e($report['appUrl'])),
      self::infoLine('Uptime', e(self::formatUptime((int) $report['uptimeSeconds']))),
      self::infoLine('DB Host', e($db['host'])),
      self::infoLine('CORS', e($report['corsOrigin'])),
      self::infoLine('Web API', e($webApi['baseUrl'])),
      self::infoLine('tipo_web', e($webApi['tipoWeb'])),
      self::infoLine('Upload dir', e($report['uploadDir'])),
      self::infoLine('Timestamp', e($report['timestamp'])),
      '<span class="line muted">────────────────────────────────────────────────────────</span>',
      '<span class="line prompt">$ <span class="cursor">█</span> curl <a href="'.e($report['apiHealthUrl']).'">/api/health?format=json</a></span>',
      '<span class="line prompt">$ <span class="cursor">█</span> docs ............... <a href="'.e(url('/api/banners')).'">/api/banners</a></span>',
      '<span class="line status '.($report['ok'] ? 'ok' : 'err').'">'.($report['ok'] ? 'STATUS: OPERATIONAL' : 'STATUS: DEGRADED').'</span>',
    ];

    return '<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>lotes_web — health terminal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #0a0a0b;
      color: #a3e635;
      font-family: "JetBrains Mono", "Cascadia Code", "Consolas", monospace;
      font-size: 13px;
      line-height: 1.55;
      padding: 1.5rem;
    }
    .window {
      max-width: 720px;
      margin: 0 auto;
      border: 1px solid #27272a;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0,0,0,0.55);
    }
    .titlebar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: #18181b;
      border-bottom: 1px solid #27272a;
    }
    .dot { width: 11px; height: 11px; border-radius: 50%; }
    .dot-r { background: #ef4444; }
    .dot-y { background: #eab308; }
    .dot-g { background: #22c55e; }
    .titlebar span {
      margin-left: auto;
      font-size: 10px;
      color: #71717a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .screen {
      padding: 1.25rem 1.5rem 1.5rem;
      background: #09090b;
      min-height: 460px;
    }
    .banner {
      color: #4ade80;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.12em;
      margin-bottom: 1rem;
      white-space: pre;
    }
    .line { display: block; margin-bottom: 2px; }
    .line.muted { color: #3f3f46; }
    .line .tag { font-weight: 700; margin-right: 6px; }
    .line .tag.info { color: #38bdf8; }
    .line.prompt { color: #d4d4d8; margin-top: 0.75rem; }
    .line.prompt a { color: #4ade80; text-decoration: none; }
    .line.prompt a:hover { text-decoration: underline; }
    .cursor { animation: blink 1s step-end infinite; color: #4ade80; }
    .line.status { margin-top: 0.5rem; font-weight: 800; letter-spacing: 0.06em; }
    .line.status.ok { color: #4ade80; }
    .line.status.err { color: #f87171; }
    @keyframes blink { 50% { opacity: 0; } }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
      <span>lotes_web@backend_laravel — bash</span>
    </div>
    <div class="screen">
      <pre class="banner">╔══════════════════════════════════════╗
║   LOTES WEB API — SYSTEM MONITOR     ║
╚══════════════════════════════════════╝</pre>
      <div class="output">
        <span class="line prompt" style="margin-top:0">$ lotes_web health --check</span>
        '.implode("\n        ", $lines).'
      </div>
    </div>
  </div>
</body>
</html>';
  }

  private static function statusLine(bool $ok, string $label, string $detail): string
  {
    $tag = $ok ? 'OK' : 'ERR';
    $color = $ok ? '#4ade80' : '#f87171';
    $padded = str_pad($label, 22, '.').' ';

    return '<span class="line"><span class="tag" style="color:'.$color.'">['.$tag.']</span> '.e($padded).e($detail).'</span>';
  }

  private static function infoLine(string $label, string $detail): string
  {
    $padded = str_pad($label, 22, '.').' ';

    return '<span class="line"><span class="tag info">[INF]</span> '.e($padded).e($detail).'</span>';
  }

  private static function formatUptime(int $seconds): string
  {
    $h = intdiv($seconds, 3600);
    $m = intdiv($seconds % 3600, 60);
    $s = $seconds % 60;

    if ($h > 0) {
      return "{$h}h {$m}m {$s}s";
    }
    if ($m > 0) {
      return "{$m}m {$s}s";
    }

    return "{$s}s";
  }
}
