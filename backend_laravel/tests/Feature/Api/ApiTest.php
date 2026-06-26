<?php

use Illuminate\Support\Facades\Route;

test('health returns json report', function () {
    $response = $this->getJson('/api/health?format=json');

    $response->assertOk()
        ->assertJsonStructure(['ok', 'timestamp', 'database', 'webApi']);
});

test('banners endpoint returns array with camelCase keys', function () {
    $response = $this->getJson('/api/banners');

    $response->assertOk();
    $data = $response->json();

    if (count($data) > 0) {
        expect($data[0])->toHaveKeys(['id', 'title', 'buttonText', 'imageUrl', 'isActive']);
    }
});

test('unauthenticated admin routes return 401', function () {
    $this->getJson('/api/stats')->assertUnauthorized()
        ->assertJson(['error' => 'Token de autenticación requerido']);
});

test('login rejects invalid credentials', function () {
    $this->postJson('/api/auth/login', [
        'email' => 'invalid@example.com',
        'password' => 'wrong-password',
    ])->assertUnauthorized()
        ->assertJson(['error' => 'Credenciales inválidas']);
});

test('login and me work with valid admin', function () {
    $login = $this->postJson('/api/auth/login', [
        'email' => env('ADMIN_EMAIL', 'admin@lotes.pe'),
        'password' => env('ADMIN_PASSWORD', 'admin123'),
    ]);

    $login->assertOk()->assertJsonStructure(['token', 'email']);

    $token = $login->json('token');

    $this->getJson('/api/auth/me', [
        'Authorization' => 'Bearer '.$token,
    ])->assertOk()->assertJsonStructure(['email']);
});
