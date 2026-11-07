<?php

namespace App\Services;

use App\Models\Brand;

class BrandService
{
    public function getAllBrands()
    {
        return Brand::with('user')->latest()->paginate(10);
    }

    public function createBrand(array $data)
    {
        return Brand::create($data);
    }

    public function getBrandById(Brand $brand)
    {
        return $brand->load('user', 'products');
    }
}