<div>
<h1>Image List</h1>

<a accesskey="" href="{{ route('upload.view') }}">Upload New Image</a>
<br/>
<br/>
@foreach ($imageData as $image)
    
        <img style="width:200px; margin:20px" src="{{ asset('storage/images/' . $image->path) }}" alt="Image">
   
@endforeach
</div>
