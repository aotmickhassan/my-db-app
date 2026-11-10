<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    {{-- Ziggy Routes --}}
    @routes
    {{-- Tailwind CSS --}}
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen p-6 md:p-10 antialiased text-slate-800">
    <div class="max-w-7xl mx-auto">

        <!-- Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-slate-900">Image Gallery</h1>
                <p class="text-sm text-slate-500 mt-1">
                    Total <span class="font-semibold text-slate-700">{{ $imageData->count() }}</span> images stored in public storage
                </p>
            </div>
            
            <!-- Button to Upload (Redirect via Ziggy) -->
            <button type="button" onclick="window.location.href = route('upload.view')" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-150 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Upload New Image</span>
            </button>
        </div>

        <!-- Success Flash Message -->
        @if (session('success'))
            <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        <!-- Image Grid -->
        @if ($imageData->isEmpty())
            <div class="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-700">No images found</h3>
                <p class="text-sm text-slate-400 mt-1 mb-6">Upload your first image to populate the gallery.</p>
                <button type="button" onclick="window.location.href = route('upload.view')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer">
                    Upload Image
                </button>
            </div>
        @else
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                @foreach ($imageData as $image)
                    <div class="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
                        <!-- Image Preview Link -->
                        <a href="{{ $image->url }}" target="_blank" class="block overflow-hidden bg-slate-100 relative aspect-video">
                            <img src="{{ $image->url }}" alt="{{ basename($image->path) }}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                        </a>

                        <!-- Footer & Action -->
                        <div class="p-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/50">
                            <!-- Custom Name on the Left -->
                            <div class="truncate mr-3" title="{{ basename($image->path) }}">
                                <span class="text-xs font-semibold text-slate-800 block truncate">
                                    {{ pathinfo($image->path, PATHINFO_FILENAME) }}
                                </span>
                                <span class="text-[10px] text-slate-400 font-mono">
                                    .{{ pathinfo($image->path, PATHINFO_EXTENSION) }}
                                </span>
                            </div>
                            
                            <!-- Delete Button on the Right -->
                            <form onsubmit="return confirmDelete(event, this.dataset.imageId)" data-image-id="{{ $image->id }}" method="POST" class="shrink-0">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition duration-150 cursor-pointer">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>

    <script>
        function confirmDelete(event, imageId) {
            if (!confirm('Are you sure you want to delete this image?')) {
                event.preventDefault();
                return false;
            }
            // Set Form action via Ziggy route()
            event.target.action = route('images.destroy', imageId);
            return true;
        }
    </script>
</body>
</html>
