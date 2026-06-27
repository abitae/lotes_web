<?php

namespace App\Services;

use App\Exceptions\AppException;
use App\Support\MapWebProject;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class WebProjectsService
{
    /**
     * @param  array<string, mixed>  $params
     * @return array<string, mixed>
     */
    public function fetchProjectsList(array $params = []): array
    {
        $query = array_merge([
            'tipo_web' => config('web_api.tipo_web'),
            'page' => $params['page'] ?? 1,
            'per_page' => $params['per_page'] ?? 50,
        ], array_filter([
            'search' => $params['search'] ?? null,
            'location' => $params['location'] ?? null,
            'project_type_id' => $params['project_type_id'] ?? null,
            'has_free_lots' => ($params['has_free_lots'] ?? false) ? '1' : null,
            'has_images' => ($params['has_images'] ?? false) ? '1' : null,
            'has_videos' => ($params['has_videos'] ?? false) ? '1' : null,
            'order' => $params['order'] ?? null,
        ], fn ($v) => $v !== null));

        return $this->webApiFetch($this->projectsUrl('/projects'), $query);
    }

    /**
     * @return array<string, mixed>
     */
    public function fetchProjectById(string|int $id): array
    {
        $response = $this->webApiFetch($this->projectsUrl("/projects/{$id}"));

        return $response['data'];
    }

    /**
     * @return array{projects: list<array<string, mixed>>, summary: array<string, mixed>}
     */
    public function fetchAllProjects(): array
    {
        $firstPage = $this->fetchProjectsList(['page' => 1, 'per_page' => 50]);
        $allProjects = $firstPage['data'] ?? [];
        $lastPage = (int) ($firstPage['meta']['last_page'] ?? 1);

        for ($page = 2; $page <= $lastPage; $page++) {
            $nextPage = $this->fetchProjectsList(['page' => $page, 'per_page' => 50]);
            $allProjects = array_merge($allProjects, $nextPage['data'] ?? []);
        }

        return [
            'projects' => $allProjects,
            'summary' => $firstPage['summary'] ?? [],
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function fetchAllMappedProjects(): array
    {
        $data = $this->fetchAllProjects();

        return array_map(
            fn (array $project) => MapWebProject::toProject($project),
            $data['projects'],
        );
    }

    private function projectsUrl(string $path): string
    {
        $base = rtrim(config('web_api.base_url'), '/');
        $normalized = str_starts_with($path, '/') ? $path : "/{$path}";

        return "{$base}/api/v1/web{$normalized}";
    }

    /**
     * @param  array<string, mixed>  $query
     * @return array<string, mixed>
     */
    private function webApiFetch(string $url, array $query = []): array
    {
        $timeout = (int) config('web_api.timeout_ms', 15000) / 1000;

        try {
            $response = Http::timeout($timeout)
                ->acceptJson()
                ->get($url, $query);

            if ($response->status() === 404) {
                throw new AppException(404, 'Proyecto no encontrado en el catálogo externo');
            }

            if ($response->status() === 429) {
                throw new AppException(429, 'Demasiadas solicitudes al catálogo externo. Intenta más tarde.');
            }

            if ($response->status() === 422) {
                $message = $response->json('message') ?: 'Parámetros inválidos en catálogo externo';
                throw new AppException(422, $message);
            }

            if (! $response->successful()) {
                throw new AppException(502, "Error del catálogo externo ({$response->status()})");
            }

            return $response->json();
        } catch (AppException $e) {
            throw $e;
        } catch (ConnectionException $e) {
            throw new AppException(504, 'Tiempo de espera agotado al consultar el catálogo externo');
        } catch (\Throwable $e) {
            throw new AppException(502, 'No se pudo conectar con el catálogo externo');
        }
    }
}
