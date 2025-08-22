<?php

namespace App\Http\Controllers;

use App\Models\collection;
use App\Models\playlist;
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
        $user = User::userSlug($user_slug)->first();
        $playlist = playlist::playlistSlug($playlist_slug)->firstOrFail();
        if (!$playlist) {
            abort(404);
        }
        $playlist->collections = collection::sharedCollection($playlist->id)->get();

        return Inertia::render("SharePlaylist", [
            "user" => $user,
            "playlist" => $playlist
        ]);
    }
}
