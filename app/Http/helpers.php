<?php

use Illuminate\Support\Collection;

enum FlashStatus: string
{
    case Success = 'success';
    case Error   = 'error';
    case Info    = 'info';
    case Warning = 'warning';
    case Dark    = 'dark';
}

function flashMessage(string $message = '',  FlashStatus $status = FlashStatus::Info): array
{
    $data =  [
        "message" => $message,
        "status" => $status->value
    ];
    return [
        "response" => $data
    ];
}


function filterResponse(array $movie): array
{
    return [
        "id" => $movie['id'],
        "title" => $movie['title'],
        "original_title" => $movie['original_title'],
        "release_date" => $movie['release_date'],
        "poster" => config('services.tmdb.image_url') . $movie['poster_path'],
        "url" => url("movie/detail/{$movie['id']}")
    ];
}

function responseDetail(Collection $movie)
{
    $keyMovieDetailResponse = [
        'id',
        'original_title',
        'title',
        'genres',
        'overview',
        'release_date',
        'poster_path',
    ];
    $data = $movie->only($keyMovieDetailResponse);
    $data = $data->mapWithKeys(fn($value, $key) => $key === 'poster_path' ? ['poster' => config('services.tmdb.image_url') . $value] : [$key => $value]);

    $urls = config('app.video_urls');
    $generateVideo = array_map(fn($url) => sprintf($url, $data['id']), $urls);
    $data = $data->put('videos', $generateVideo);
    return $data;
}
