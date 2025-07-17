<?php

namespace App\Http\Controllers;

use App\Tmdb\APITmdb;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class MovieDetailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        $movie = (new APITmdb)->fetchData('/movie/' . $id);
        $filteredResult = Arr::only($movie, [
            'id',
            'original_title',
            'genre_ids',
            'overview',
            'release_date',
            'poster_path',
        ]);
        $filteredResult['videos'] = [
            "https://vidsrc.io/embed/movie?tmdb={$filteredResult['id']}",
            "https://vidsrc.pm/embed/movie?tmdb={$filteredResult['id']}"
        ];

        $recommendations = (new APITmdb)->fetchData("/movie/{$id}/recommendations");
        $filteredRecommendation = collect($recommendations['results'])->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            "genre_ids" => $movie['genre_ids'],
            "overview" => $movie['overview'],
            "release_date" => $movie['release_date'],
            "poster_path" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
            "link" => url("movie/detail/{$movie['id']}")
        ]);
        return Inertia::render('MovieDetail', [
            "movie" => $filteredResult,
            "recommendation_list" => $filteredRecommendation
        ]);
    }
}
