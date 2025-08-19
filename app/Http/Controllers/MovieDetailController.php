<?php

namespace App\Http\Controllers;

use App\Models\playlist;
use App\Tmdb\APITmdb;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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
            "https://vidsrc.pm/embed/movie?tmdb={$filteredResult['id']}",
            "https://vidsrc.to/embed/movie/{$filteredResult['id']}",
            "https://player.autoembed.cc/embed/movie/{$filteredResult['id']}",
            "https://embed.su/embed/movie/{$filteredResult['id']}",
            "https://multiembed.mov/?video_id={$filteredResult['id']}&tmdb=1"
        ];



        $filteredResult['poster'] = $filteredResult['poster_path'] ?? null;
        unset($filteredResult["poster_path"]);
        $filteredResult['poster'] = "https://image.tmdb.org/t/p/original" . $movie['poster_path'];

        $recommendations = (new APITmdb)->fetchData("/movie/{$id}/recommendations");
        $result = array_filter($recommendations['results'], fn($type) => !empty($type['release_date']) && !empty($type['poster_path']));
        $result = collect(array_values($result))->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            "release_date" => $movie['release_date'],
            "poster" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
            "url" => url("movie/detail/{$movie['id']}")
        ]);

        $user = auth()->user();
        $playlist = [];
        if ($user) {
            $playlist = $user->playlists()->select("id", "name")->get();
            $playlist = $playlist->map(function ($playlist) use ($id) {
                $hasMovie = $playlist->collections()->where('collections.id', $id)->exists();

                return [
                    'id' => $playlist->id,
                    "name" => $playlist->name,
                    "checked" => $hasMovie
                ];
            });
        }


        return Inertia::render('MovieDetail', [
            "movie" => $filteredResult,
            "recommendation_list" => $result,
            "playlists" => $playlist
        ]);
    }
}
