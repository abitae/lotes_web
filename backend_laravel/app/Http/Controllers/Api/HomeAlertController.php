<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\HomeAlertResource;
use App\Models\HomeAlertModal;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeAlertController extends Controller
{
    public function show(): JsonResponse
    {
        $alert = HomeAlertModal::query()->find(1);
        if (! $alert) {
            throw new AppException(404, 'Modal de aviso no encontrado');
        }

        return response()->json(new HomeAlertResource($alert));
    }

    public function update(Request $request): JsonResponse
    {
        $alert = HomeAlertModal::query()->find(1);
        if (! $alert) {
            throw new AppException(404, 'Modal de aviso no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'isEnabled' => 'is_enabled',
            'title' => 'title',
            'description' => 'description',
            'imageUrl' => 'image_url',
            'videoUrl' => 'video_url',
            'buttonText' => 'button_text',
            'buttonLink' => 'button_link',
        ], ['isEnabled']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $alert->update($data);

        return response()->json(new HomeAlertResource($alert->fresh()));
    }
}
