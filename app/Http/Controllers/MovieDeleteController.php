<?php

namespace App\Http\Controllers;

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
        $playlist->collections()->detach($id);
        return back()->with(flashMessage('Success delete movie from playlist', FlashStatus::Success));
    }
}
