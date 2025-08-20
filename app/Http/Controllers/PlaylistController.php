<?php

namespace App\Http\Controllers;

use App\Models\playlist;
use App\Models\User;
use FlashStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PlaylistController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        try {
            $user = auth()->user();
            $playlist = $user->playlists()->create([
                "name" => $request->name,
            ]);

            return back()->with(flashMessage('playlist created', FlashStatus::Success));
        } catch (\Exception $e) {
            return back()->with(flashMessage($e->getMessage(), FlashStatus::Error));
        }
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'is_public' => 'required|number'
        ]);
        try {
            $user = auth()->user();
            $playlist = $user->playlists()->find($id);
            $playlist->is_public = $request->is_public;
            $playlist->save();
            return back()->with(flashMessage('Update privacy success', FlashStatus::Success));
        } catch (\Exception $e) {
            return back()->with(flashMessage($e->getMessage(), FlashStatus::Error));
        }
    }

    public function destroy($playlist)
    {
        $user = auth()->user();
        $playlist = $user->playlists()->find($playlist);
        $playlist->delete();
    }
}
