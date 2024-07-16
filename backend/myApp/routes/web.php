<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BetController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/bet/{type}', [BetController::class, 'bet']);
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{id}', [GameController::class, 'show']);
Route::post('/games', [GameController::class, 'store']);
Route::delete('/games/{id}', [GameController::class, 'destroy']);