<?php

namespace App\Http\Controllers;

use App\Models\collection;
use App\Models\playlist;
use FlashStatus;
use Illuminate\Http\Request;

class MovieDeleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(playlist $playlist, $id)
    {
        $user = auth()->user();
        if ($user->cannot('delete', $playlist)) {
            return back()->with(flashMessage('You are not authorized to delete this playlist', FlashStatus::Error));
        }
        $playlist->collections()->detach($id);
        return back()->with(flashMessage('Success delete movie from playlist', FlashStatus::Success));
    }
}
