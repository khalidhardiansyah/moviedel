<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlaylistTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_should_show_shared_playlist_page(): void
    {
        $response = $this->get(route('playlist.share_show', [
            'user_slug' => 'van-kihn-43',
            'playlist_slug' => 'film-cult-1'
        ]));
        $response->assertStatus(200);
    }
}
