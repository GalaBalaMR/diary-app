<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;


Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/messages', MessageController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);