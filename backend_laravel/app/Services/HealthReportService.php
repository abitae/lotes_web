<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class HealthReportService
{
  /**
   * @return array<string, mixed>
   */
  public function build(): array
  {
    $dbOk = false;
    $dbLatencyMs = null;
    $dbError = null;

    try {
      $t0 = microtime(true);
      DB::select('SELECT 1');
      $dbLatencyMs = (int) round((microtime(true) - $t0) * 1000);
      $dbOk = true;
    } catch (\Throwable $e) {
      $dbError = $e->getMessage();
    }

    $start = defined('LARAVEL_START') ? LARAVEL_START : (float) ($_SERVER['REQUEST_TIME_FLOAT'] ?? microtime(true));
    $uploadDir = public_path('uploads');

    return [
      'ok' => $dbOk,
      'timestamp' => now()->toISOString(),
      'uptimeSeconds' => (int) (microtime(true) - $start),
      'environment' => config('app.env'),
      'appUrl' => config('app.url'),
      'phpVersion' => PHP_VERSION,
      'laravelVersion' => app()->version(),
      'database' => [
        'ok' => $dbOk,
        'host' => config('database.connections.mysql.host').':'.config('database.connections.mysql.port'),
        'name' => config('database.connections.mysql.database'),
        'latencyMs' => $dbLatencyMs,
        'error' => $dbError,
      ],
      'corsOrigin' => env('CORS_ORIGIN', 'http://localhost:3000'),
      'webApi' => [
        'baseUrl' => config('web_api.base_url'),
        'tipoWeb' => config('web_api.tipo_web'),
        'timeoutMs' => config('web_api.timeout_ms'),
      ],
      'uploadDir' => $uploadDir,
      'apiHealthUrl' => url('/api/health?format=json'),
    ];
  }

  public function wantsJson(?string $acceptHeader, mixed $formatQuery): bool
  {
    if ($formatQuery === 'json') {
      return true;
    }

    $accept = strtolower($acceptHeader ?? '');

    return str_contains($accept, 'application/json') && ! str_contains($accept, 'text/html');
  }
}
