<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class MovieDetailTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_detail_movie_page(): void
    {
        $movie = json_decode(file_get_contents(base_path('/tests/fixtures/getMovie.json')), true);
        $recomendation_movie = json_decode(file_get_contents(base_path('/tests/fixtures/getRecommendationMovie.json')), true);
        Http::fake([
            '*/movie/*/recommendations*' =>  Http::response($recomendation_movie, 200),
            '*/movie/*' => Http::response($movie, 200),
        ]);

        $response = $this->get('/movie/detail/1061474');
        $response->assertOk();
        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->has(
                    'movie',
                    fn(AssertableInertia $movies) => $movies
                        ->whereAll([
                            'id' => 550,
                            'original_title' => 'Fight Club',
                            'release_date' => '1999-10-15'
                        ])
                        ->has('genres.0')
                        ->etc()
                )
        );
    }
}
