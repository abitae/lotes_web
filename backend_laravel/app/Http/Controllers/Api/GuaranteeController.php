<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\GuaranteeItemResource;
use App\Http\Resources\GuaranteeSectionResource;
use App\Models\GuaranteeItem;
use App\Models\GuaranteeSection;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class GuaranteeController extends Controller
{
    public function index(): JsonResponse
    {
        $section = GuaranteeSection::query()->find(1);
        if (! $section) {
            throw new AppException(404, 'Sección de garantías no encontrada');
        }

        $items = GuaranteeItem::query()
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'section' => new GuaranteeSectionResource($section),
            'items' => GuaranteeItemResource::collection($items),
        ]);
    }

    public function updateSection(Request $request): JsonResponse
    {
        $section = GuaranteeSection::query()->find(1);
        if (! $section) {
            throw new AppException(404, 'Sección de garantías no encontrada');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'eyebrow' => 'eyebrow',
            'heading' => 'heading',
            'description' => 'description',
            'backgroundImageUrl' => 'background_image_url',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $section->update($data);

        return response()->json(new GuaranteeSectionResource($section->fresh()));
    }

    public function storeItem(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields($body, ['icon', 'title', 'description'], 'icon, title y description son requeridos');

        $item = GuaranteeItem::query()->create([
            'id' => (string) Str::uuid(),
            'icon' => $body['icon'],
            'title' => $body['title'],
            'description' => $body['description'],
            'sort_order' => $body['sortOrder'] ?? 0,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new GuaranteeItemResource($item), 201);
    }

    public function updateItem(Request $request, string $id): JsonResponse
    {
        $item = GuaranteeItem::query()->find($id);
        if (! $item) {
            throw new AppException(404, 'Tarjeta no encontrada');
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

        $item->update($data);

        return response()->json(new GuaranteeItemResource($item->fresh()));
    }

    public function destroyItem(string $id): Response
    {
        $deleted = GuaranteeItem::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Tarjeta no encontrada');
        }

        return response()->noContent();
    }
}
