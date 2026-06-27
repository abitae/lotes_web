<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    private const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

    private const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

    public function store(Request $request): JsonResponse
    {
        if (! $request->hasFile('file')) {
            throw new AppException(400, 'No se recibió ningún archivo');
        }

        $file = $request->file('file');
        $mime = $file->getMimeType() ?? '';
        $size = $file->getSize() ?? 0;

        if (! str_starts_with($mime, 'image/') && ! str_starts_with($mime, 'video/')) {
            throw new AppException(400, 'Solo se permiten imágenes o videos');
        }

        $max = str_starts_with($mime, 'video/') ? self::MAX_VIDEO_BYTES : self::MAX_IMAGE_BYTES;
        if ($size > $max) {
            $mb = (int) round($max / (1024 * 1024));
            throw new AppException(400, "El archivo supera el límite de {$mb} MB");
        }

        $ext = $file->getClientOriginalExtension();
        $filename = time().'-'.random_int(0, 999999).($ext ? ".{$ext}" : '');
        $path = 'uploads/'.$filename;

        Storage::disk('public')->putFileAs('uploads', $file, $filename);

        $url = Storage::disk('public')->url($path);

        return response()->json([
            'url' => $url,
            'filename' => $filename,
            'mimeType' => $mime,
            'mediaType' => str_starts_with($mime, 'video/') ? 'video' : 'image',
        ], 201);
    }
}
