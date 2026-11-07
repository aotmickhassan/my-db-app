<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService;

    // Service Dependency Injection
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        // সার্ভিস থেকে ডাটা নিয়ে React-এ পাঠানো
        return Inertia::render('Products/Index', [
            'products' => $this->productService->getAllProducts()
        ]);
    }

    public function create()
    {
        // ড্রপডাউন ডাটা পাঠানো
        return Inertia::render('Products/Create', $this->productService->getDropdownData());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            // অন্যান্য ভ্যালিডেশন...
        ]);

        $this->productService->createProduct($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }
}