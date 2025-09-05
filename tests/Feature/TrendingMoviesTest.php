<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia;

class TrendingMoviesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_trending_movie_list(): void
    {
        $trending_movies = json_decode(file_get_contents(base_path('/tests/fixtures/getTrendingMovies.json')), true);
        Http::fake([
            '*/trending/movie/day*' =>  Http::response($trending_movies, 200),
        ]);
        $this->get(route('movies.trending'))
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component('Trending')
                    ->has(
                        'movies',
                        20,
                    )
            );
    }
}
