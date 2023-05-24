<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TodoCategoriesController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/new-user', [MessageController::class, 'newMessage']);
    Route::resource('/messages', MessageController::class);
    Route::get('/notes/{id}/restore', [NoteController::class , 'restore']);
    Route::resource('/notes', NoteController::class);
    Route::get('/todoes/{id}/restore', [TodoController::class, 'restore']);
    Route::get('/todoCategories/{id}/restore', [TodoCategoriesController::class, 'restore']);
    Route::apiResource('/todoCategories', TodoCategoriesController::class);
});
Route::resource('/todoes', TodoController::class);

Route::get('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/get-user', [AuthController::class, 'getUser']);