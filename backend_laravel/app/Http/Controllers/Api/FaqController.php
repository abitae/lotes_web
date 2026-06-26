<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class FaqController extends Controller
{
    public function index(): JsonResponse
    {
        $faqs = Faq::query()
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get();

        return response()->json(FaqResource::collection($faqs));
    }

    public function store(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields($body, ['question', 'answer'], 'question y answer son requeridos');

        $faq = Faq::query()->create([
            'id' => (string) Str::uuid(),
            'question' => $body['question'],
            'answer' => $body['answer'],
            'sort_order' => $body['sortOrder'] ?? 0,
            'is_active' => ($body['isActive'] ?? true) !== false,
        ]);

        return response()->json(new FaqResource($faq), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $faq = Faq::query()->find($id);
        if (! $faq) {
            throw new AppException(404, 'FAQ no encontrada');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'question' => 'question',
            'answer' => 'answer',
            'sortOrder' => 'sort_order',
            'isActive' => 'is_active',
        ], ['isActive']);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $faq->update($data);

        return response()->json(new FaqResource($faq->fresh()));
    }

    public function destroy(string $id): Response
    {
        $deleted = Faq::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'FAQ no encontrada');
        }

        return response()->noContent();
    }
}
