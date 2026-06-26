<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Testimonial::query()->orderByDesc('created_at')->get();

        return response()->json(TestimonialResource::collection($items));
    }

    public function store(Request $request): JsonResponse
    {
        $body = $request->all();
        CamelCaseMapper::requireFields(
            $body,
            ['name', 'role', 'quote', 'projectPurchased', 'avatarUrl'],
            'name, role, quote, projectPurchased y avatarUrl son requeridos',
        );

        $item = Testimonial::query()->create([
            'id' => (string) Str::uuid(),
            'name' => $body['name'],
            'role' => $body['role'],
            'stars' => $body['stars'] ?? 5,
            'quote' => $body['quote'],
            'project_purchased' => $body['projectPurchased'],
            'avatar_url' => $body['avatarUrl'],
        ]);

        return response()->json(new TestimonialResource($item), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $item = Testimonial::query()->find($id);
        if (! $item) {
            throw new AppException(404, 'Testimonio no encontrado');
        }

        $data = CamelCaseMapper::extract($request->all(), [
            'name' => 'name',
            'role' => 'role',
            'stars' => 'stars',
            'quote' => 'quote',
            'projectPurchased' => 'project_purchased',
            'avatarUrl' => 'avatar_url',
        ]);

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $item->update($data);

        return response()->json(new TestimonialResource($item->fresh()));
    }

    public function destroy(string $id): Response
    {
        $deleted = Testimonial::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Testimonio no encontrado');
        }

        return response()->noContent();
    }
}
