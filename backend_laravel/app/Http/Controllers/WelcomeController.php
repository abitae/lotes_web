<?php

namespace App\Http\Controllers;

use App\Services\HealthReportService;
use App\Support\HealthTerminal;

class WelcomeController extends Controller
{
  public function __construct(private readonly HealthReportService $healthReport) {}

  public function __invoke()
  {
    $report = $this->healthReport->build();

    return response(HealthTerminal::render($report), 200, [
      'Content-Type' => 'text/html; charset=UTF-8',
    ]);
  }
}
