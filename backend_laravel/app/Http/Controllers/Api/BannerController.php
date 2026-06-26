<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class BannerController extends Controller
{
    public function index(): JsonResponse
    {
        $banners = Banner::query()->orderBy('created_at')->get();

        return response()->json(BannerResource::collection($banners));
    }

    public function store(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields(
            $body,
            ['title', 'subtitle', 'buttonText', 'imageUrl'],
            'title, subtitle, buttonText e imageUrl son requeridos',
        );

        $banner = Banner::query()->create([
            'id' => (string) Str::uuid(),
            'title' => $body['title'],
            'subtitle' => $body['subtitle'],
            'button_text' => $body['buttonText'],
            'image_url' => $body['imageUrl'],
            'badge_text' => $body['badgeText'] ?? null,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new BannerResource($banner), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $banner = Banner::query()->find($id);
        if (! $banner) {
            throw new AppException(404, 'Banner no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'title' => 'title',
            'subtitle' => 'subtitle',
            'buttonText' => 'button_text',
            'imageUrl' => 'image_url',
            'badgeText' => 'badge_text',
            'isActive' => 'is_active',
        ], ['isActive']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $banner->update($data);

        return response()->json(new BannerResource($banner->fresh()));
    }

    public function destroy(string $id): Response
    {
        $deleted = Banner::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Banner no encontrado');
        }

        return response()->noContent();
    }
}
