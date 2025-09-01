<?php

namespace App\Http\Controllers;

use App\Models\collection;
use App\Models\playlist;
use App\Models\User;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class SharePlaylistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($user_slug, $playlist_slug)
    {
        $user = User::userSlug($user_slug)->firstOrFail();
        $playlist = playlist::playlistSlug($playlist_slug, $user->id)->firstOrFail();
        if (!$playlist) {
            abort(404);
        }
        $playlist->collections = collection::sharedCollection($playlist->id)->get();
        $msg = $playlist->collections->isEmpty() ? 'Looks like this playlist doesn’t have any films yet. Check
                    back soon for recommendations.' : null;
        return Inertia::render("SharePlaylist", [
            "user" => $user,
            "playlist" => $playlist,
            "msg" => $msg
        ]);
    }
}
