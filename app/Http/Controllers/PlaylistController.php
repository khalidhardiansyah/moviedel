<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function store(Request $request, User $user)
    {
        $playlist = $user->playlists()->create([
            "name" => $request->name,
            "description" => $request->description
        ]);
    }

    public function destroy($playlist, User $user)
    {
        $playlist = $user->playlists()->find($playlist);
        $playlist->delete();
    }
}
