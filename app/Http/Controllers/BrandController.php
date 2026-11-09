<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class BrandController extends Controller
{
    /**
     * GET /brands
     * Route: brands.index
     * Page : resources/js/pages/Brands/Index.jsx
     */
    public function index(): Response
    {
        $brands = Brand::latest()->get();

        return Inertia::render('Brands/Index', [
            'brands' => $brands,
        ]);
    }

    /**
     * GET /brands/create
     * Route: brands.create
     * Page : resources/js/pages/Brands/Create.jsx
     */
    public function create(): Response
    {
        return Inertia::render('Brands/Create');
    }

    /**
     * POST /brands
     * Route: brands.store
     * Redirects → brands.index
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'image'  => 'nullable|string|max:500',
            'status' => 'required|boolean',
        ]);

        // $validated['user_id'] = auth()->id() ?? 1;

        Brand::create($validated);

        return redirect()
            ->route('brands.index')
            ->with('success', 'Brand সফলভাবে তৈরি হয়েছে!');
    }

    /**
     * GET /brands/{brand}
     * Route: brands.show
     * Page : resources/js/pages/Brands/Show.jsx
     */
    public function show(Brand $brand): Response
    {
        return Inertia::render('Brands/Show', [
            'brand' => $brand->load('products'),
        ]);
    }

    /**
     * GET /brands/{brand}/edit
     * Route: brands.edit
     * Page : resources/js/pages/Brands/Edit.jsx
     */
    public function edit(Brand $brand): Response
    {
        return Inertia::render('Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * PUT|PATCH /brands/{brand}
     * Route: brands.update
     * Redirects → brands.index
     */
    public function update(Request $request, Brand $brand): RedirectResponse
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'image'  => 'nullable|string|max:500',
            'status' => 'required|boolean',
        ]);

        $brand->update($validated);

        return redirect()
            ->route('brands.index')
            ->with('success', 'Brand সফলভাবে আপডেট হয়েছে!');
    }

    /**
     * DELETE /brands/{brand}
     * Route: brands.destroy
     * Redirects → brands.index
     */
    public function destroy(Brand $brand): RedirectResponse
    {
        $brand->delete();

        return redirect()
            ->route('brands.index')
            ->with('success', 'Brand সফলভাবে মুছে ফেলা হয়েছে!');
    }
}
