<?php

namespace App\Http\Controllers;

use App\Models\playlist;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::id();
        $data = playlist::playlistByUser($id)->get();
        return Inertia::render("Dashboard", [
            "user_playlist" => $data
        ]);
    }
}
