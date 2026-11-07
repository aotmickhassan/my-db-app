<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin
        $admin = User::factory()
            ->admin()
            ->create([
                'name' => 'Super Admin',
                'email' => 'admin@example.com',
            ]);

        // 2. Create Customers
        $customers = User::factory(4)->create();

        // 3. Create Categories, Brands and Products
        foreach ($customers as $user) {

            // Create 2-3 categories for each customer
            $categories = Category::factory(
                fake()->numberBetween(2, 3)
            )->for($user)->create();

            // Create 2 brands for each customer
            $brands = Brand::factory(2)
                ->for($user)
                ->create();

            // Create 10-15 products for each customer
            Product::factory(
                fake()->numberBetween(10, 15)
            )->for($user)
                ->state(fn () => [
                    'category_id' => $categories->random()->id,
                    'brand_id' => $brands->random()->id,
                ])
                ->create();
        }

        // 4. Create some products for Admin too
        $adminCategories = Category::factory(3)
            ->for($admin)
            ->create();

        $adminBrands = Brand::factory(2)
            ->for($admin)
            ->create();

        Product::factory(10)
            ->for($admin)
            ->state(fn () => [
                'category_id' => $adminCategories->random()->id,
                'brand_id' => $adminBrands->random()->id,
            ])
            ->create();
    }
}