<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            'body' => fake()->word(2),
            'kind' => fake()->randomElement(['message', 'todo', 'internal']),
            'status' => fake()->randomElement(['success', 'danger']),
            'displayed' => fake()->randomElement(['true', 'false']),
            'user_id' => User::all()->random()->id,
            'receiver_id' => User::all()->random()->id,
        ];
    }
}
