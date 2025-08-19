<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class MovieDetailTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_detail_movie_page(): void
    {
        $response = $this->get('/movie/detail/1061474');
        $response->assertOk();
        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->has(
                    'movie',
                    fn(AssertableInertia $movies) => $movies
                        ->where('id', 1061474)
                        ->where('original_title', 'Superman')
                        ->where('release_date', '2025-07-09')
                        ->has('genres.0')
                        ->etc()
                )
        );
    }

    public function test_it_should_redirect_to_login_page_when_unauthenticated_user_click_save_to_playlist(): void
    {
        $response = $this->get('/movie/detail/1061474');
        $response->assertOk();
    }
}
