<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Services\WebProjectsService;
use App\Support\MapWebProject;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    private const MONTH_LABELS = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

    public function __construct(private readonly WebProjectsService $webProjects) {}

    public function index(): JsonResponse
    {
        $inquiries = Inquiry::query()->get();
        $external = $this->webProjects->fetchAllProjects();
        $projects = array_map(
            fn (array $project) => MapWebProject::toProject($project),
            $external['projects'],
        );
        $summary = $external['summary'];

        $pendingLeads = $inquiries->where('status', 'Pendiente')->count();
        $totalLotsSold = (int) ($summary['lots_total'] ?? 0) - (int) ($summary['lots_free'] ?? 0);

        $typesMap = [];
        foreach ($projects as $project) {
            $type = $project['projectType'];
            $typesMap[$type] = ($typesMap[$type] ?? 0) + 1;
        }

        $monthlyCounts = array_fill(0, 12, 0);
        foreach ($inquiries as $inquiry) {
            if ($inquiry->created_at) {
                $monthlyCounts[(int) $inquiry->created_at->format('n') - 1]++;
            }
        }

        $monthlyLeadsTrend = [];
        foreach (array_slice(self::MONTH_LABELS, 0, 6) as $idx => $month) {
            $monthlyLeadsTrend[] = [
                'month' => $month,
                'leads' => $monthlyCounts[$idx] ?? 0,
            ];
        }

        $projectTypeDistribution = [];
        foreach ($typesMap as $name => $value) {
            $projectTypeDistribution[] = ['name' => $name, 'value' => $value];
        }

        return response()->json([
            'totalProjects' => (int) ($summary['projects_count'] ?? 0),
            'totalLeads' => $inquiries->count(),
            'pendingLeads' => $pendingLeads,
            'totalLotsSold' => $totalLotsSold,
            'monthlyLeadsTrend' => $monthlyLeadsTrend,
            'projectTypeDistribution' => $projectTypeDistribution,
        ]);
    }
}
