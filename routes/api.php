<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TodoController;

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/messages', MessageController::class);
    Route::get('/notes/{id}/restore', [NoteController::class , 'restore']);
    Route::resource('/notes', NoteController::class);
    Route::get('/todo/{id}/restore', [TodoController::class, 'restore']);
    Route::resource('/todo', TodoController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);