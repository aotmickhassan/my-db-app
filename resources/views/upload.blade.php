<div>
    </h1>Upload FILES</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        @csrf
         <label for="file">Select Image</label>
        <input type="file" name="file" id="file"  accept="image/*"
        required>
        <br/>
        <button type="submit">Upload</button>
    </form>
</div>
