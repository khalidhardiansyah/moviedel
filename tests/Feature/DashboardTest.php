<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_playlist_page_when_user_authenticated(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('playlists'))->assertOk();
    }

    public function test_it_should_redirect_to_login_page_when_user_unauthenticated(): void
    {
        $response = $this->get(route('playlists'))->assertRedirect(route('login'));;
    }
}
