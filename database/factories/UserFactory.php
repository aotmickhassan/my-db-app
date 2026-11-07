<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Default password for generated users.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),

            'email' => fake()->unique()->safeEmail(),

            'phone' => fake()->unique()->numerify('01#########'),

            'password' => static::$password ??= Hash::make('password'),

            'type' => 'customer',

            'status' => true,

            'email_verified_at' => now(),

            'remember_token' => Str::random(5),
        ];
    }

    /**
     * Define an admin user state.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'admin',
        ]);
    }

    /**
     * Define an inactive user state.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => false,
        ]);
    }

    /**
     * Define an unverified user state.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
