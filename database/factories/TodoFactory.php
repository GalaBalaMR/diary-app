<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(2),
            'body' => fake()->sentence(2),
            'date' => fake()->dateTimeBetween('-1 week', '+2 week'),
            'time' => fake()->time('H:i:s'),
            'user_id' => User::all()->random()->id,
        ];
    }
}
