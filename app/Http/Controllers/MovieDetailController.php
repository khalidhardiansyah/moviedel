<?php

namespace App\Http\Controllers;

use App\Tmdb\APITmdb;
use Inertia\Inertia;

class MovieDetailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id, APITmdb $apitmdb)
    {
        $movie = $apitmdb->getData("/movie/{$id}");
        $filteredResult = responseDetail($movie);
        $recommendations = $apitmdb->getData("/movie/{$id}/recommendations")['results'];
        $result = array_filter($recommendations, fn($type) => !empty($type['release_date']) && !empty($type['poster_path']));
        $result = collect($result)->map(fn($movie) => filterResponse($movie));
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
