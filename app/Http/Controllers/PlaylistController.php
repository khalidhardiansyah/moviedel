<?php

namespace App\Http\Controllers;

use FlashStatus;
use Illuminate\Http\Request;


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
            'is_public' => 'required|boolean'
        ]);
        try {
            $user = auth()->user();
            $playlist = $user->playlists()->find($id);
            if (!$playlist) {
                return back()->with(flashMessage('Playlist not found', FlashStatus::Error));
            }
            if ($user->cannot('update', $playlist)) {
                return back()->with(flashMessage('You are not authorized to update this playlist', FlashStatus::Error));
            }
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
        if ($user->cannot('delete', $playlist)) {
            return back()->with(flashMessage('You are not authorized to delete this playlist', FlashStatus::Error));
        }
        if (!$playlist) {
            return back()->with(flashMessage('Playlist not found', FlashStatus::Error));
        }
        $playlist->delete();
        return back()->with(flashMessage('Playlist deleted', FlashStatus::Success));
    }
}
