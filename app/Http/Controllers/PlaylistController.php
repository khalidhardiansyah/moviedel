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

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->find($id);
        $playlist->is_public = $request->is_public;
        $playlist->save();
        return back()->with("response", [
            "message" => "successfull update privacy",
            "status" => "success"
        ]);
    }

    public function destroy($playlist)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->find($playlist);
        $playlist->delete();
    }
}
