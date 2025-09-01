<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\playlist;
use App\Models\collection;
use Illuminate\Support\Arr;
use Inertia\Testing\AssertableInertia;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SharePlaylistsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_it_should_return_shared_playlists(): void
    {
        $user = User::factory()->has(
            playlist::factory()
                ->state(['is_public' => true])
                ->count(1)
                ->hasAttached(collection::factory()->count(3)),
        )->create()->load(['playlists']);
        $playlist_slug = $user->playlists->first()['name_slug'];
        $response = $this->get(route('playlist.share_show', [
            'user_slug' => $user->name_slug,
            'playlist_slug' => $playlist_slug,
        ]))->assertOk();
    }

    public function test_it_should_returns_404_if_parameter_not_found(): void
    {
        $response = $this->get(route('playlist.share_show', [
            'user_slug' => 'van-kihn-43',
            'playlist_slug' => 'film-cult',
        ]));
        $response->assertStatus(404);
    }

    public function test_it_should_returns_message_if_playlist_doesnt_have_movie_yet(): void
    {
        $user = User::factory()->has(
            playlist::factory()
                ->state(['is_public' => true])
                ->count(1),
        )->create()->load(['playlists']);


        $playlist_slug = $user->playlists->first()['name_slug'];
        $response = $this
            ->get(route('playlist.share_show', [
                'user_slug' => $user->name_slug,
                'playlist_slug' => $playlist_slug,
            ]))
            ->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page
                ->where('msg', 'Looks like this playlist doesn’t have any films yet. Check
                    back soon for recommendations.')
                ->has('playlist.collections', 0));
    }
}
