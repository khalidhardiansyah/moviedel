<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collection>
 */
class CollectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->numberBetween(1, 999),
            'title' => fake()->sentence(),
            'original_title' => fake()->sentence(),
            'year' => strval(fake()->year()),
            'poster' => fake()->sentence(6),
        ];
    }
}
