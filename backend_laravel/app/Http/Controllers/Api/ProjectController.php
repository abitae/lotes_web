<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WebProjectsService;
use App\Support\MapWebProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    public function __construct(private readonly WebProjectsService $webProjects) {}

    public function index(): JsonResponse
    {
        $tipoWeb = config('web_api.tipo_web');
        $cacheKey = "web_projects_list:{$tipoWeb}";

        $projects = Cache::remember($cacheKey, now()->addMinutes(5), function () {
            $data = $this->webProjects->fetchAllProjects();

            return array_map(
                fn (array $project) => MapWebProject::toProject($project),
                $data['projects'],
            );
        });

        return response()->json($projects);
    }

    public function show(string $id): JsonResponse
    {
        $project = $this->webProjects->fetchProjectById($id);

        return response()->json(MapWebProject::toProject($project));
    }
}
