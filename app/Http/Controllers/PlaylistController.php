<?php

namespace App\Http\Controllers;

use App\Models\playlist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaylistController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->create([
            "name" => $request->name,
        ]);
    }

    public function destroy($playlist)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->find($playlist);
        $playlist->delete();
    }
}
