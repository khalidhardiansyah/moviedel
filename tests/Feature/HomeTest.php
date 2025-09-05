<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
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
        $result = json_decode(file_get_contents(base_path('/tests/fixtures/getMovie.json')), true);
        Http::fake(['*/search*' => function ($request) use ($result) {
            $keyword = $request->data()['keyword'] ?? null;
            if ($keyword === 'sekawan limo') {
                return Http::response($result, 200);
            }
        }]);
        $this->get('/search?keyword=sekawan limo')
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component('Index')
                    ->has(
                        'movies.0',
                        fn(AssertableInertia $movie) => $movie
                            ->whereAll([
                                'id' => 1279914,
                                'original_title' => 'Sekawan Limo',
                            ])
                            ->etc()
                    )
                    ->has('keyword')
            );
    }
    public function test_home_page_if_search_movie_and_cant_find_it(): void
    {
        $result = json_decode(file_get_contents(base_path('/tests/fixtures/getSearchMovieNoResult.json')), true);
        Http::fake(['*/search*' => function ($request) use ($result) {
            $keyword = $request->data()['keyword'] ?? null;
            if ($keyword === 'film ukm mahasiswa menang venice festival') {
                return Http::response($result, 200);
            }
        }]);
        $this
            ->followingRedirects()
            ->get(route('findMovie', [
                'keyword'   => "film ukm mahasiswa menang venice festival"
            ]))
            ->assertOk()
            ->assertSee('No results found for film ukm mahasiswa menang venice festival. Try different keywords.');
    }
}
