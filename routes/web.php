<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieDetailController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaveToPlaylistController;
use App\Http\Controllers\SharePlaylistController;
use App\Tmdb\APITmdb;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('movies.index');
Route::get('/movie/detail/{id}', MovieDetailController::class)->name('movie.index');
Route::get("/users/{user_slug}/playlists/{playlist_slug}", SharePlaylistController::class)->name("playlist.share_show");
Route::middleware('auth')->group(function () {
    Route::post('/playlist', [PlaylistController::class, 'store'])->name('playlist.store');
    Route::patch('/playlist/{id}', [PlaylistController::class, 'update'])->name('playlist.update');
    Route::post('/save-to-playlist', SaveToPlaylistController::class)->name('save.store');
    Route::delete('/playlist/{playlist}', [PlaylistController::class, 'destroy'])->name('playlist.destroy');
});


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/user', function (Request $request) {
    $api = new APITmdb();
    return $api->fetchData('/search/multi', [
        "query" => "Sekawan Limo",
        "include_adult" => false,
        "language" => "en-US",
        "page" => 1
    ]);

    // return $api->fetchData('movie/28/recommendations');
});



require __DIR__ . '/auth.php';
