<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Casts\AsStringable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class HomeTest extends TestCase
{
    // use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_the_home_page()
    {
        $this->get(route('movies.create'))->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page
                ->component('Index'));
    }
    public function test_home_page_if_search_movie_and_found_them(): void
    {
        $this->get('/search?q=iron man')
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component('Index')
                    ->has('movies.0')
                    ->has('q')
            );
    }
    public function test_home_page_if_search_movie_and_cant_find_it(): void
    {
        $this
            ->followingRedirects()
            ->get(route('findMovie', [
                'q'   => "film ukm mahasiswa menang venice festival"
            ]))
            ->assertOk()
            ->assertSee('not found');
    }
}
