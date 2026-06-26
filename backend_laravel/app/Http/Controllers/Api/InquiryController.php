<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\InquiryResource;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class InquiryController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Inquiry::query()->orderByDesc('created_at')->get();

        return response()->json(InquiryResource::collection($items));
    }

    public function store(Request $request): JsonResponse
    {
        $body = $request->all();
        foreach (['fullName', 'phone', 'email', 'projectInterest', 'message'] as $field) {
            if (empty($body[$field])) {
                throw new AppException(400, 'fullName, phone, email, projectInterest y message son requeridos');
            }
        }

        $item = Inquiry::query()->create([
            'id' => (string) Str::uuid(),
            'full_name' => $body['fullName'],
            'phone' => $body['phone'],
            'email' => $body['email'],
            'project_interest' => $body['projectInterest'],
            'message' => $body['message'],
            'status' => 'Pendiente',
        ]);

        return response()->json(new InquiryResource($item), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $item = Inquiry::query()->find($id);
        if (! $item) {
            throw new AppException(404, 'Consulta no encontrada');
        }

        $data = [];
        if ($request->has('status')) {
            $data['status'] = $request->input('status');
        }
        if ($request->has('notes')) {
            $data['notes'] = $request->input('notes');
        }

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $item->update($data);

        return response()->json(new InquiryResource($item->fresh()));
    }

    public function destroy(string $id): Response
    {
        $deleted = Inquiry::query()->where('id', $id)->delete();
        if ($deleted === 0) {
            throw new AppException(404, 'Consulta no encontrada');
        }

        return response()->noContent();
    }
}
