<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;

class ProductService
{
    public function getAllProducts()
    {
        return Product::with(['category', 'brand', 'user'])->latest()->paginate(10);
    }

    public function createProduct(array $data)
    {
        return Product::create($data);
    }

    // ফর্মে ক্যাটাগরি ও ব্র্যান্ডের ড্রপডাউন ডাটা
    public function getDropdownData()
    {
        return [
            'categories' => Category::where('status', 1)->get(['id', 'name']),
            'brands' => Brand::where('status', 1)->get(['id', 'name']),
        ];
    }

    public function getProductById(Product $product)
    {
        return $product->load('category', 'brand', 'user');
    }
}