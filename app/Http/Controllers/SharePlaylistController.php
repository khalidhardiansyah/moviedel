<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SharePlaylistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($user_slug, $playlist_slug)
    {
        $user = User::where('name_slug', $user_slug)->first();
        $playlist = $user->playlists()->where("name_slug", $playlist_slug)->where("is_public", true)->select("id", "name", "name_slug")->firstOrfail();
        if (!$playlist) {
            abort(404);
        }

        $playlist->collections = DB::table("collections")
            ->join("collection_playlists", "collections.id", "=", "collection_playlists.collection_id")
            ->where("collection_playlists.playlist_id", $playlist->id)
            ->select("collections.id", "title", "original_title", "year", "poster")
            ->get();

        $playlist->collections->map(fn($collection) => tap($collection->poster = url("https://image.tmdb.org/t/p/original{$collection->poster}")));
        $playlist->collections->map(fn($collection) => tap($collection->link = url("movie/detail/{$collection->id}")));
        $playlist->collections =  $playlist->collections->map(function ($collection) {
            $array = (array) $collection;
            $array['release_date'] = $array['year'];
            unset($array['year']);
            return $array;
        });


        return Inertia::render("SharePlaylist", [
            "user" => $user,
            "playlist" => $playlist
        ]);
    }
}
