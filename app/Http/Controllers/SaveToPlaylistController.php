<?php

namespace App\Http\Controllers;

use App\Models\collection;
use App\Models\playlist;
use Illuminate\Http\Request;

class SaveToPlaylistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $playlist = new playlist();
        $collection = collection::firstOrCreate([
            "id" => $request->id,
            "title" => $request->title,
            "original_title" => $request->original_title,
            "year" => $request->year,
            "poster" => $request->poster,
        ]);
        $collection->playlists()->sync($request->playlist_id);
        // dd($request->playlist_id);

        // todo
        // ubah migrasi tabel
    }
}
