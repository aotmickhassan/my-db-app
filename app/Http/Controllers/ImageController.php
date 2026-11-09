<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::latest()->get()->map(function ($image) {
            return [
                'id' => $image->id,
                'original_name' => $image->original_name,
                'url' => Storage::url($image->path),
                'mime_type' => $image->mime_type,
                'size' => $image->size,
                'created_at' => $image->created_at,
            ];
        });

        return Inertia::render('Images/Index', [
            'images' => $images,
        ]);
    }
    function upload(Request $request){
        // $path=$request->file("file")->store('images', 'public');
        // $pathArray=explode("/",$path);
        // $imgPath= $pathArray[1];
        // $image=new Image();
        // $image->path=$imgPath;
        // if  ($image->save()){
        //     return redirect()->route('upload.list');
        // };
        
        $validated = $request->validate([
            'file' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,gif,webp',
                'max:2048',
            ],
        ]);

        $file = $validated['file'];

        // Store image inside storage/app/public/images
        $path = $file->store('images', 'public');

        // Save image information in database
        Image::create([
            'original_name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return redirect()
            ->route('images.index')
            ->with('success', 'Image uploaded successfully!');
    }
    function list(){
        $imageData=Image::all();
        return view("display", compact('imageData') );
    }
}
