<?php

namespace Tests\Feature;

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
        $response = $this->actingAs($user)
            ->followingRedirects()
            ->post(route('playlist.store'))
            ->assertOk()->assertInertia(
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
}
