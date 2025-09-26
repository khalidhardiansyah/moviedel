<?php

namespace Database\Seeders;

use App\Models\collection;
use App\Models\playlist;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory(3)
            ->has(
                Playlist::factory()
                    ->count(2)
                    ->has(Collection::factory()->count(1))
            )
            ->create();
    }
}
