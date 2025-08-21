<?php

namespace App\Http\Controllers;

use App\Models\collection;
use App\Models\playlist;
use FlashStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SaveToPlaylistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'id' => 'required|numeric',
                'title' => 'required|string',
                'original_title' => 'required|string',
                'year' => 'required|string',
                'poster' => 'required|string',
                'playlist_id' => 'required|array|min:1',
                'playlist_id.*' => 'integer|exists:playlists,id'
            ],
            [
                'playlist_id' => "You need to choose at least one playlist."
            ]
        );

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        $collectionData = $validator->safe()->except('playlist_id');
        $playlistData = $validator->safe()->only('playlist_id');
        try {
            $collection = collection::firstOrCreate($collectionData);
            $collection->playlists()->sync($playlistData['playlist_id']);
            return back()->with(flashMessage('Success added to playlist', FlashStatus::Success));
        } catch (\Exception $e) {
            return back()->with(flashMessage($e->getMessage(), FlashStatus::Error));
        }
    }
}
