<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieDetailController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaveToPlaylistController;
use App\Http\Controllers\SharePlaylistController;
use App\Http\Controllers\TrendingMovieController;
use Illuminate\Support\Facades\Route;


Route::get('/', [HomeController::class, 'create'])->name('movies.create');
Route::get('/search', [HomeController::class, 'findMovie'])->name('findMovie');

Route::get("/trending", TrendingMovieController::class)->name("movies.trending");
Route::get('/movie/detail/{id}', MovieDetailController::class)->name('movie.detail');

Route::get("/users/{user_slug}/playlists/{playlist_slug}", SharePlaylistController::class)->name("playlist.share_show");
Route::middleware('auth')->group(function () {
    Route::post('/playlist', [PlaylistController::class, 'store'])->name('playlist.store');
    Route::patch('/playlist/{id}', [PlaylistController::class, 'update'])->name('playlist.privacy');
    Route::post('/save-to-playlist', SaveToPlaylistController::class)->name('save.store');
    Route::delete('/playlist/{playlist}', [PlaylistController::class, 'destroy'])->name('playlist.destroy');
});


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
