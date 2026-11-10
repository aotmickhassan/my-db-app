<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Image</title>
    {{-- Ziggy Routes --}}
    @routes
    {{-- Tailwind CSS --}}
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center p-4 antialiased">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        <!-- Header -->
        <div class="mb-6 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-slate-800">Upload Image</h1>
            <p class="text-sm text-slate-500 mt-1">Files will be saved into <code class="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs">public/storage/images</code></p>
        </div>

        <!-- Validation Errors -->
        @if (isset($errors) && $errors->any())
            <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <ul class="list-disc list-inside space-y-1">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Form (Action set via Ziggy) -->
        <form id="uploadForm" method="POST" enctype="multipart/form-data" class="space-y-5">
            @csrf
            
            <!-- Custom Image Name Input -->
            <div>
                <label for="name" class="block text-sm font-semibold text-slate-700 mb-1.5">
                    Custom Image Name <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value="{{ old('name') }}" 
                    placeholder="e.g. summer-beach-photo, my-cool-car" 
                    required
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none transition"
                >
            </div>

            <!-- Image File Input -->
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Select Image File <span class="text-red-500">*</span></label>
                
                <label for="file" class="group relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-50 hover:bg-indigo-50/30 transition-all duration-200">
                    <div id="dropzoneText" class="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-indigo-500">
                        <svg class="w-9 h-9 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p class="text-sm font-medium"><span class="font-semibold text-indigo-600">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-slate-400 mt-1">JPG, PNG, GIF, WEBP, AVIF up to 20MB</p>
                    </div>

                    <div id="previewContainer" class="hidden absolute inset-0 p-2">
                        <img id="imagePreview" src="#" alt="Preview" class="w-full h-full object-contain rounded-xl">
                    </div>

                    <input type="file" name="file" id="file" class="hidden" accept="image/*" required onchange="handleFilePreview(event)">
                </label>
            </div>

            <!-- Upload Button -->
            <button type="submit" id="submitBtn" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition duration-150 flex items-center justify-center gap-2 cursor-pointer">
                <span>Upload & Save With Name</span>
            </button>
        </form>

        <!-- Gallery Link via Ziggy -->
        <div class="mt-6 pt-5 border-t border-slate-100 text-center">
            <button type="button" onclick="window.location.href = route('upload.list')" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition flex items-center justify-center gap-1 mx-auto cursor-pointer">
                &larr; View Uploaded Gallery
            </button>
        </div>
    </div>

    <script>
        // Set Form Action via Ziggy
        document.getElementById('uploadForm').action = route('upload.post');

        function handleFilePreview(event) {
            const input = event.target;
            const dropzoneText = document.getElementById('dropzoneText');
            const previewContainer = document.getElementById('previewContainer');
            const preview = document.getElementById('imagePreview');

            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    previewContainer.classList.remove('hidden');
                    dropzoneText.classList.add('opacity-0');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
</body>
</html>
