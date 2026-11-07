<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAllCategories()
    {
        return Category::with('user')->latest()->paginate(10);
    }

    public function createCategory(array $data)
    {
        return Category::create($data);
    }

    public function getCategoryById(Category $category)
    {
        return $category->load('user', 'products');
    }
}