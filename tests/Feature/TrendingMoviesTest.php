<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia;

class TrendingMoviesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_trending_movie_list(): void
    {
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
