<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'brand_id' => Brand::factory(),

            'title' => fake()->words(3, true),
            'sub_title' => fake()->sentence(5),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),

            'image' => null,

            'status' => fake()->boolean(90),

            'size' => fake()->randomElements(
                ['S', 'M', 'L', 'XL'],
                fake()->numberBetween(1, 4)
            ),

            'color' => fake()->randomElements(
                ['Black', 'Red', 'Blue', 'Green'],
                fake()->numberBetween(1, 4)
            ),
        ];
    }
}