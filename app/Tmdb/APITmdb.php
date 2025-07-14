<?php

namespace App\Tmdb;

use Illuminate\Support\Facades\Http;

class APITmdb
{

    private  $URL = "https://api.themoviedb.org/3/";

    // public function getMovieByKeyword()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])
    //         ->withQueryParameters([
    //             "query" => "Sekawan Limo",
    //             "include_adult" => false,
    //             "language" => "en-US",
    //             "page" => 1
    //         ])
    //         ->get($this->URL . '/search/multi');

    //     $data =  $response->json();
    //     return $data;
    // }


    public function fetchData($url, $query = [])
    {
        $apiReadKey = config('services.tmdb.read_api_key');
        $response = Http::withHeaders([
            'Authorization' => "Bearer " . $apiReadKey,
            'accept' => 'application/json',
        ]);
        if (!empty($query)) {
            $response->withQueryParameters($query);
        }
        $data =  $response->get($this->URL . $url)->json();
        return $data;
    }

    // public function getNowPlayingMovie()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])->get($this->URL . '/movie/now_playing?language=en-US&page=1&region=ID');

    //     $data =  $response->json();
    //     return $data;
    // }

    // public function getRecomendationMovie()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])->get($this->URL . '/movie/28/recommendations');

    //     $data =  $response->json();
    //     return $data;
    // }


    // public function getMovieDetails()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])->get($this->URL . '/movie/28');

    //     $data =  $response->json();
    //     return $data;
    // }



    // public function getListMovieByGenre()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])->get($this->URL . 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres={id_genre}');

    //     $data =  $response->json();
    //     return $data;
    // }

    // public function getGenre()
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $this->API_READ_KEY,
    //         'accept' => 'application/json',
    //     ])->get($this->URL . 'genre/movie/list?language=en');

    //     $data =  $response->json();
    //     return $data;
    // }
}
