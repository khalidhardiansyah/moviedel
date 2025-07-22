<?php

namespace App\Http\Controllers;

use App\Models\playlist;
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
        $list_genres = (new APITmdb)->fetchData('/genre/movie/list');
        $filteredResult = Arr::only($movie, [
            'id',
            'original_title',
            'title',
            'genres',
            'overview',
            'release_date',
            'poster_path',
        ]);
        $filteredResult['videos'] = [
            "https://vidsrc.io/embed/movie?tmdb={$filteredResult['id']}",
            "https://vidsrc.pm/embed/movie?tmdb={$filteredResult['id']}"
        ];

        $list_genres = $list_genres['genres'];

        $recommendations = (new APITmdb)->fetchData("/movie/{$id}/recommendations");
        $filteredRecommendation = collect($recommendations['results'])->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            'title' => $movie['title'],
            "genres" => array_intersect_key($list_genres, $filteredResult['genres']),
            "overview" => $movie['overview'],
            "release_date" => $movie['release_date'],
            "poster_path" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
            "link" => url("movie/detail/{$movie['id']}")
        ]);

        $user = auth()->user();
        $playlist = playlist::where('user_id', '=', $user->id)->get(['id', 'name']);
        return Inertia::render('MovieDetail', [
            "movie" => $filteredResult,
            "recommendation_list" => $filteredRecommendation,
            "playlists" => $playlist
        ]);
    }
}
