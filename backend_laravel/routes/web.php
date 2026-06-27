<?php

use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/system', WelcomeController::class);

Route::view('/{any?}', 'app')
    ->where('any', '^(?!api)(?!up)(?!storage).*$');
