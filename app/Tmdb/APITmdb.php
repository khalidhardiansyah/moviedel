<?php

namespace App\Tmdb;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class APITmdb
{

    // private  $URL = "https://api.themoviedb.org/3/";
    // public function fetchData($url, $query = [])
    // {
    //     $apiReadKey = config('services.tmdb.read_api_key');
    //     $response = Http::withHeaders([
    //         'Authorization' => "Bearer " . $apiReadKey,
    //         'accept' => 'application/json',
    //     ]);
    //     if (!empty($query)) {
    //         $response->withQueryParameters($query);
    //     }
    //     $data =  $response->get($this->URL . $url)->json();
    //     return $data;
    // }

    private $BaseUrl, $apiKey;
    public function __construct($apiKey, $BaseUrl)
    {
        $this->BaseUrl = $BaseUrl;
        $this->apiKey = $apiKey;
    }

    public function getData($url, $query = [])
    {
        $request = Http::withHeaders([
            'Authorization' => "Bearer " . $this->apiKey,
            'accept' => 'application/json',
        ]);
        if (!empty($query)) {
            $request = $request->withQueryParameters($query);
        }
        $fullURL = $this->BaseUrl . $url;
        $data =  $request->get($fullURL)->collect();
        return $data;
    }
}
