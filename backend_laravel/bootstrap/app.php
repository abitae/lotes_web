<?php

use App\Exceptions\AppException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                $message = $request->bearerToken()
                    ? 'Token inválido o expirado'
                    : 'Token de autenticación requerido';

                return response()->json(['error' => $message], 401);
            }
        });

        $exceptions->render(function (AppException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json(['error' => $e->getMessage()], $e->statusCode);
            }
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            if ($request->is('api/*')) {
                $message = $e->validator->errors()->first() ?: 'Datos inválidos';

                return response()->json(['error' => $message], 422);
            }
        });

        $exceptions->render(function (\Throwable $e, Request $request) {
            if (
                $request->is('api/*')
                && ! ($e instanceof AppException)
                && ! ($e instanceof ValidationException)
                && ! ($e instanceof AuthenticationException)
                && ! ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException)
            ) {
                report($e);

                return response()->json(['error' => 'Error interno del servidor'], 500);
            }
        });
    })->create();
