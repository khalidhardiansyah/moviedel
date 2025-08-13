<?php

namespace App\Http\Controllers;

use App\FlashMessage;
use App\FlashStatus;
use App\Tmdb\APITmdb;
use Illuminate\Http\Request;
use Inertia\Inertia;


class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function create()
    {
        return Inertia::render('Index');
    }

    public function findMovie(Request $request)
    {
        $query = $request->query("q");
        $api = new APITmdb();
        $found = $api->fetchData('search/movie', [
            "query" => $query,
            "include_adult" => false,
            "language" => "en-US",
            "page" => 1
        ]);
        if (empty($found['results'])) {
            return redirect()->route('movies.create', ['q' => $query])->with(FlashMessage::response('not found'));
        }
        $result = array_filter($found['results'], fn($type) => !empty($type['release_date']) && !empty($type['poster_path']));
        $result = collect(array_values($result))->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            "release_date" => $movie['release_date'],
            "poster" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
            "url" => url("movie/detail/{$movie['id']}")
        ]);
        return Inertia::render('Index', [
            "movies" => $result,
            'q' => $query,
        ]);
    }
}
