<?php

namespace App\Http\Controllers;

use App\Tmdb\APITmdb;
use Inertia\Inertia;
use Inertia\Response;

class TrendingMovieController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(APITmdb $apitmdb): Response
    {
        $newMovieList = $apitmdb->getData('trending/movie/day?language=en-US', [
            "language" => "en-US",
            "page" => 1,
            "region" => "ID"
        ])['results'];

        $filteredResult = collect($newMovieList)->map(fn($movie) => filterResponse($movie));
        return Inertia::render('Trending', [
            "movies" => $filteredResult
        ]);
    }
}
