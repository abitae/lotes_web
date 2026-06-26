<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Support\BcryptjsPassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if (! $email || ! $password) {
            throw new AppException(400, 'Email y contraseña son requeridos');
        }

        $admin = Admin::query()->where('email', $email)->first();

        if (! $admin || ! BcryptjsPassword::verify($password, $admin->password_hash)) {
            throw new AppException(401, 'Credenciales inválidas');
        }

        $token = $admin->createToken('admin')->plainTextToken;

        return response()->json([
            'token' => $token,
            'email' => $admin->email,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        /** @var Admin $admin */
        $admin = $request->user();

        return response()->json(['email' => $admin->email]);
    }
}
