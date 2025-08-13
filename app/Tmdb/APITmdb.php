<?php

namespace App\Tmdb;

use Illuminate\Support\Facades\Http;

class APITmdb
{

    private  $URL = "https://api.themoviedb.org/3/";
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
}
