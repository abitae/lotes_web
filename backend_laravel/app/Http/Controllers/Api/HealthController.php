<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\HealthReportService;
use App\Support\HealthTerminal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HealthController extends Controller
{
  public function __construct(private readonly HealthReportService $healthReport) {}

  public function __invoke(Request $request): JsonResponse|Response
  {
    $report = $this->healthReport->build();

    if ($this->healthReport->wantsJson($request->header('Accept'), $request->query('format'))) {
      return response()->json([
        'ok' => $report['ok'],
        'timestamp' => $report['timestamp'],
        'uptimeSeconds' => $report['uptimeSeconds'],
        'environment' => $report['environment'],
        'database' => $report['database'],
        'webApi' => $report['webApi'],
      ], $report['ok'] ? 200 : 503);
    }

    return response(HealthTerminal::render($report), $report['ok'] ? 200 : 503, [
      'Content-Type' => 'text/html; charset=UTF-8',
    ]);
  }
}
