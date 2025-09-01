<?php

namespace App\Providers;

use App\Tmdb\APITmdb;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class TmdbProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(APITmdb::class, function (Application $app) {
            return new APITmdb(
                apiKey: config('services.tmdb.read_api_key'),
                BaseUrl: config('services.tmdb.url')
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
