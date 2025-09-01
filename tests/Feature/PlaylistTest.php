<?php

namespace Tests\Feature;

use App\Models\collection;
use App\Models\playlist;
use App\Models\User;
use FlashStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class PlaylistTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    public function test_it_should_redirect_to_login_when_user_unauthenticated(): void
    {
        $response = $this
            ->post(route('playlist.store'))
            ->assertRedirect(route('login'));
    }

    public function test_it_should_return_error_when_required_field_empty(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->followingRedirects()
            ->post(route('playlist.store'), [
                'name' => ''
            ])
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->where('errors.name', 'The name field is required.')
            );
    }
    public function test_it_should_return_success_message_when_authenticated_user_fill_the_field(): void
    {

        $user = User::factory()->create();

        $this->actingAs($user)
            ->followingRedirects()
            ->post(route('playlist.store'), [
                'name' => 'film cult'
            ])
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->has(
                        'flash',
                        1,
                        fn(AssertableInertia $flash) => $flash
                            ->whereAll([
                                'message' => 'playlist created',
                                'status' => 'success'
                            ])
                    )
            );
    }

    public function test_it_should_return_success_message_when_user_adds_movie_to_playlist(): void
    {
        $user = User::factory()->hasPlaylists(2)->create()->load('playlists');
        $input = collection::factory()->make()->toArray();
        $data = $user->toArray();
        $playlistsId = array_column($data['playlists'], 'id');
        $input['playlist_id'] = $playlistsId;
        $this->actingAs($user)
            ->followingRedirects()
            ->post(route('collection.store'), $input)
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->has('errors', 0)
                    ->has(
                        'flash',
                        1,
                        fn(AssertableInertia $flash) => $flash
                            ->whereAll([
                                'message' => 'Success added to playlist',
                                'status' => 'success'
                            ])
                    )
            );

        $this->assertDatabaseHas('collection_playlists', [
            'playlist_id' => $playlistsId,
            'collection_id' => $input['id']
        ]);
    }

    public function test_it_should_return_error_when_user_adds_movie_without_selecting_playlist(): void
    {
        $user = User::factory()->create();
        $movie = collection::factory()->make()->toArray();
        $this->actingAs($user)
            ->followingRedirects()
            ->post(route('collection.store'), $movie)
            ->assertOk()
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->has(
                        'errors',
                        1
                    )
                    ->where('errors.playlist_id', 'You need to choose at least one playlist.')
            );
        $this->assertDatabaseMissing('collection_playlists', [
            'collection_id' => $movie['id']
        ]);
    }
}
