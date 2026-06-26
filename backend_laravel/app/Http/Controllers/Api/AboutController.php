<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\AboutPageResource;
use App\Http\Resources\AboutValueResource;
use App\Http\Resources\ExpertAdvisorResource;
use App\Models\AboutPage;
use App\Models\AboutValue;
use App\Models\ExpertAdvisor;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class AboutController extends Controller
{
    public function show(): JsonResponse
    {
        $page = AboutPage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de la página Nosotros no encontrado');
        }

        $values = AboutValue::query()->orderBy('sort_order')->orderBy('created_at')->get();
        $advisors = ExpertAdvisor::query()->orderBy('sort_order')->orderBy('created_at')->get();

        return response()->json([
            'page' => new AboutPageResource($page),
            'values' => AboutValueResource::collection($values),
            'advisors' => ExpertAdvisorResource::collection($advisors),
        ]);
    }

    public function updatePage(Request $request): JsonResponse
    {
        $page = AboutPage::query()->find(1);
        if (! $page) {
            throw new AppException(404, 'Contenido de la página Nosotros no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'heroEyebrow' => 'hero_eyebrow',
            'heroHeading' => 'hero_heading',
            'heroDescription' => 'hero_description',
            'heroBackgroundImageUrl' => 'hero_background_image_url',
            'missionHeading' => 'mission_heading',
            'missionDescription' => 'mission_description',
            'visionHeading' => 'vision_heading',
            'visionDescription' => 'vision_description',
            'valuesEyebrow' => 'values_eyebrow',
            'valuesHeading' => 'values_heading',
            'valuesDescription' => 'values_description',
            'advisorsEyebrow' => 'advisors_eyebrow',
            'advisorsHeading' => 'advisors_heading',
            'advisorsDescription' => 'advisors_description',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $page->update($data);

        return response()->json(new AboutPageResource($page->fresh()));
    }

    public function storeValue(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields($body, ['icon', 'title', 'description'], 'icon, title y description son requeridos');

        $value = AboutValue::query()->create([
            'id' => (string) Str::uuid(),
            'icon' => $body['icon'],
            'title' => $body['title'],
            'description' => $body['description'],
            'sort_order' => $body['sortOrder'] ?? 0,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new AboutValueResource($value), 201);
    }

    public function updateValue(Request $request, string $id): JsonResponse
    {
        $value = AboutValue::query()->find($id);
        if (! $value) {
            throw new AppException(404, 'Valor no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'icon' => 'icon',
            'title' => 'title',
            'description' => 'description',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active',
        ], ['isActive']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $value->update($data);

        return response()->json(new AboutValueResource($value->fresh()));
    }

    public function destroyValue(string $id): Response
    {
        $deleted = AboutValue::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Valor no encontrado');
        }

        return response()->noContent();
    }

    public function storeAdvisor(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields($body, ['name', 'role', 'bio', 'imageUrl'], 'name, role, bio e imageUrl son requeridos');

        $advisor = ExpertAdvisor::query()->create([
            'id' => (string) Str::uuid(),
            'name' => $body['name'],
            'role' => $body['role'],
            'bio' => $body['bio'],
            'image_url' => $body['imageUrl'],
            'sort_order' => $body['sortOrder'] ?? 0,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new ExpertAdvisorResource($advisor), 201);
    }

    public function updateAdvisor(Request $request, string $id): JsonResponse
    {
        $advisor = ExpertAdvisor::query()->find($id);
        if (! $advisor) {
            throw new AppException(404, 'Asesor no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'name' => 'name',
            'role' => 'role',
            'bio' => 'bio',
            'imageUrl' => 'image_url',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active',
        ], ['isActive']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $advisor->update($data);

        return response()->json(new ExpertAdvisorResource($advisor->fresh()));
    }

    public function destroyAdvisor(string $id): Response
    {
        $deleted = ExpertAdvisor::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Asesor no encontrado');
        }

        return response()->noContent();
    }
}
