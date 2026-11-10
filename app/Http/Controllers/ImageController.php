<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ImageController extends Controller
{
    /**
     * Show the uploaded images gallery.
     */
    public function index(): View
    {
        return $this->list();
    }

    /**
     * Show the image upload form.
     */
    public function create(): View
    {
        return view('upload');
    }

    /**
     * Store an uploaded image with a user-specified custom name into storage/app/public/images
     * (accessible publicly via public/storage/images).
     */
    public function upload(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'file' => [
                'required',
                'file',
                'image',
                'mimes:jpg,jpeg,png,gif,webp,avif,svg,bmp',
                'max:20480', // 20MB max
            ],
        ]);

        $file = $validated['file'];
        $extension = $file->getClientOriginalExtension();

        // Convert user's entered name to safe filename format (e.g. "summer-beach-photo.jpg")
        $cleanName = Str::slug($validated['name']);
        $filename = $cleanName . '.' . $extension;

        // If a file already exists with this name, append timestamp to keep both safe
        if (Storage::disk('public')->exists('images/' . $filename)) {
            $filename = $cleanName . '-' . time() . '.' . $extension;
        }

        // Store file with custom name inside storage/app/public/images/
        $path = $file->storeAs('images', $filename, 'public');

        // Save path in the database
        Image::create([
            'path' => $path,
        ]);

        return redirect()
            ->route('upload.list')
            ->with('success', 'Image saved as "' . $filename . '" successfully!');
    }

    /**
     * List all stored images.
     */
    public function list(): View
    {
        $imageData = Image::latest()->get();

        return view('display', compact('imageData'));
    }

    /**
     * Delete an image from public storage and database.
     */
    public function destroy(Image $image): RedirectResponse
    {
        $relativePath = str_starts_with($image->path, 'images/')
            ? $image->path
            : 'images/' . $image->path;

        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }

        $image->delete();

        return redirect()
            ->route('upload.list')
            ->with('success', 'Image deleted successfully!');
    }
}
