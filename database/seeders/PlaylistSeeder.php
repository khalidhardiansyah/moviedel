<?php

namespace Database\Seeders;

use App\Models\collection;
use App\Models\playlist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //     $collection =  collection::factory()->count(5)->create();
        //     playlist::factory()->count(5)->create()->each(function ($playlist) use ($collection) {
        //         $playlist->collections()->attach(
        //             $collection->random(3)->pluck('id')->toArray()
        //         );
        //     });

        $playlist = playlist::factory()->has(collection::factory()->count(5))->create();
    }
}
