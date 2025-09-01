<?php

namespace App\Tmdb;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class APITmdb
{
    private $BaseUrl, $apiKey;
    public function __construct($apiKey, $BaseUrl)
    {
        $this->BaseUrl = $BaseUrl;
        $this->apiKey = $apiKey;
    }

    public function getData(string $url, array $query = []): Collection
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
