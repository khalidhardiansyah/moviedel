<?php

namespace App\Http\Controllers;

use App\Tmdb\APITmdb;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $api = new APITmdb();
        if (empty($request->query('keyword'))) {
            $newMovieList = $api->fetchData('movie/now_playing', [
                "language" => "en-US",
                "page" => 1,
                "region" => "ID"
            ])['results'];
        } else {
            $newMovieList =  $this->searchByKeyword(strtolower($request->query('keyword')));
            // $newMovieList =;
        }

        $filteredResult = collect(array_values($newMovieList))->map(fn($movie) => [
            "id" => $movie['id'],
            "original_title" => $movie['original_title'],
            "genre_ids" => $movie['genre_ids'],
            "overview" => $movie['overview'],
            "release_date" => $movie['release_date'],
            "poster_path" => "https://image.tmdb.org/t/p/original" . $movie['poster_path'],
        ]);

        // dd(gettype($filteredResult));
        return Inertia::render('Index', [
            "movies" => $filteredResult
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function searchByKeyword($keyword)
    {
        $api = new APITmdb();
        $found = $api->fetchData('search/multi', [
            "query" => $keyword,
            "include_adult" => false,
            "language" => "en-US",
            "page" => 1
        ]);
        $result = array_filter($found['results'], fn($type) => !empty($type['release_date']));
        return $result;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
