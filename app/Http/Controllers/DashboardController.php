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
        $data->each((fn($item) => $item["url"] = url("/users/{$user->name_slug}/playlists/$item->name_slug")));
        $data->each(fn($item) => $item->collections->each(fn($collection) => $collection->url = url("/movie/detail/{$collection->id}")));
        $data->each(fn($item) => $item->collections->each(function ($collection) {
            $collection['release_date'] = $collection['year'];
            unset($collection['year']);
        }));

        return Inertia::render("Dashboard", [
            "user_playlist" => $data
        ]);
    }
}
