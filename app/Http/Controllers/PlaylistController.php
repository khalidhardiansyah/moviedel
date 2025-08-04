<?php

namespace App\Http\Controllers;

use App\Models\playlist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PlaylistController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->create([
            "name" => $request->name,
            "name_slug" => Str::slug($request->name . " " . $user->id)
        ]);
    }

    public function destroy($playlist)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->find($playlist);
        $playlist->delete();
    }
}
