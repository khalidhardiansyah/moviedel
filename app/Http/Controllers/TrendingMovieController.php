<?php

namespace App\Http\Controllers;

use App\Tmdb\APITmdb;
use Inertia\Inertia;

class TrendingMovieController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(APITmdb $apitmdb)
    {
        $newMovieList = $apitmdb->getData('trending/movie/day?language=en-US', [
            "language" => "en-US",
            "page" => 1,
            "region" => "ID"
        ])['results'];

        $filteredResult = collect($newMovieList)->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            "release_date" => $movie['release_date'],
            "poster" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
            "url" => url("movie/detail/{$movie['id']}")
        ]);
        return Inertia::render('Trending', [
            "movies" => $filteredResult
        ]);
    }
}
