<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\CorporateChannelResource;
use App\Models\CorporateChannel;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class ChannelController extends Controller
{
    private const VALID_TYPES = ['address', 'phone', 'email', 'whatsapp'];

    public function index(): JsonResponse
    {
        $channels = CorporateChannel::query()
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get();

        return response()->json(CorporateChannelResource::collection($channels));
    }

    public function store(Request $request): JsonResponse
    {
        $body = $request->all();
        if (empty($body['channelType']) || empty($body['label']) || empty($body['value'])) {
            throw new AppException(400, 'channelType, label y value son requeridos');
        }
        if (! in_array($body['channelType'], self::VALID_TYPES, true)) {
            throw new AppException(400, 'channelType inválido');
        }

        $channel = CorporateChannel::query()->create([
            'id' => (string) Str::uuid(),
            'channel_type' => $body['channelType'],
            'label' => $body['label'],
            'value' => $body['value'],
            'extra_info' => $body['extraInfo'] ?? null,
            'sort_order' => $body['sortOrder'] ?? 0,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new CorporateChannelResource($channel), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $channel = CorporateChannel::query()->find($id);
        if (! $channel) {
            throw new AppException(404, 'Canal no encontrado');
        }

        $body = $request->all();
        if (isset($body['channelType']) && ! in_array($body['channelType'], self::VALID_TYPES, true)) {
            throw new AppException(400, 'channelType inválido');
        }

        $data = CamelCaseMapper::extract($body, [
            'channelType' => 'channel_type',
            'label' => 'label',
            'value' => 'value',
            'extraInfo' => 'extra_info',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active',
        ], ['isActive']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $channel->update($data);

        return response()->json(new CorporateChannelResource($channel->fresh()));
    }

    public function destroy(string $id): Response
    {
        $deleted = CorporateChannel::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Canal no encontrado');
        }

        return response()->noContent();
    }
}
