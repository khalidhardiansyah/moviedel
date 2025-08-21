<?php

namespace App\Http\Controllers;

use App\FlashMessage;
use App\FlashStatus;
use App\Providers\TmdbProvider;
use App\Tmdb\APITmdb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function findMovie(Request $request, APITmdb $apitmdb)
    {
        $validator = Validator::make($request->query(), [
            'keyword' => 'required|string'
        ], [
            'keword' => 'Search field cannot be empty.'
        ]);
        if ($validator->fails()) {
            return redirect()->route('movies.create', ['keyword' => $request->query('keyword')])->withErrors($validator)->withInput();
        }
        $query = $validator->validated()['keyword'];

        $found = $apitmdb->getData('search/movie', [
            "query" => $query,
            "include_adult" => false,
            "language" => "en-US",
            "page" => 1
        ]);
        if (empty($found['results'])) {
            return redirect()->route('movies.create', ['keyword' => $query])->with(flashMessage("No results found for {$query}. Try different keywords."));
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
            'keyword' => $query,
        ]);
    }
}
