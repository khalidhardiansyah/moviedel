<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $data = $user->playlists()->select('id', 'name', 'is_public', 'name_slug')->with(['collections:id,title,original_title,year,poster'])->get();
        $data->each(fn($item) => $item->collections->each->makeHidden('pivot'));
        return response()->json($data);
        // return Inertia::render("Dashboard", [
        //     "user_playlist" => $data
        // ]);
    }
}
