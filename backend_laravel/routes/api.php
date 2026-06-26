<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\ContactFormController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\GuaranteeController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\HomeAlertController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/banners', [BannerController::class, 'index']);
Route::post('/banners', [BannerController::class, 'store'])->middleware('auth:sanctum');
Route::put('/banners/{id}', [BannerController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/banners/{id}', [BannerController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::post('/testimonials', [TestimonialController::class, 'store'])->middleware('auth:sanctum');
Route::put('/testimonials/{id}', [TestimonialController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/inquiries', [InquiryController::class, 'index'])->middleware('auth:sanctum');
Route::post('/inquiries', [InquiryController::class, 'store']);
Route::patch('/inquiries/{id}', [InquiryController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/stats', [StatsController::class, 'index'])->middleware('auth:sanctum');

Route::post('/upload', [UploadController::class, 'store'])->middleware('auth:sanctum');

Route::get('/site-settings', [SiteSettingsController::class, 'show']);
Route::put('/site-settings', [SiteSettingsController::class, 'update'])->middleware('auth:sanctum');

Route::get('/guarantees', [GuaranteeController::class, 'index']);
Route::put('/guarantees/section', [GuaranteeController::class, 'updateSection'])->middleware('auth:sanctum');
Route::post('/guarantees/items', [GuaranteeController::class, 'storeItem'])->middleware('auth:sanctum');
Route::put('/guarantees/items/{id}', [GuaranteeController::class, 'updateItem'])->middleware('auth:sanctum');
Route::delete('/guarantees/items/{id}', [GuaranteeController::class, 'destroyItem'])->middleware('auth:sanctum');

Route::get('/contact-forms', [ContactFormController::class, 'index']);
Route::put('/contact-forms/{slug}', [ContactFormController::class, 'update'])->middleware('auth:sanctum');

Route::get('/channels', [ChannelController::class, 'index']);
Route::post('/channels', [ChannelController::class, 'store'])->middleware('auth:sanctum');
Route::put('/channels/{id}', [ChannelController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/channels/{id}', [ChannelController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/faqs', [FaqController::class, 'index']);
Route::post('/faqs', [FaqController::class, 'store'])->middleware('auth:sanctum');
Route::put('/faqs/{id}', [FaqController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/faqs/{id}', [FaqController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/about', [AboutController::class, 'show']);
Route::put('/about/page', [AboutController::class, 'updatePage'])->middleware('auth:sanctum');
Route::post('/about/values', [AboutController::class, 'storeValue'])->middleware('auth:sanctum');
Route::put('/about/values/{id}', [AboutController::class, 'updateValue'])->middleware('auth:sanctum');
Route::delete('/about/values/{id}', [AboutController::class, 'destroyValue'])->middleware('auth:sanctum');
Route::post('/about/advisors', [AboutController::class, 'storeAdvisor'])->middleware('auth:sanctum');
Route::put('/about/advisors/{id}', [AboutController::class, 'updateAdvisor'])->middleware('auth:sanctum');
Route::delete('/about/advisors/{id}', [AboutController::class, 'destroyAdvisor'])->middleware('auth:sanctum');

Route::get('/home-alert', [HomeAlertController::class, 'show']);
Route::put('/home-alert', [HomeAlertController::class, 'update'])->middleware('auth:sanctum');
