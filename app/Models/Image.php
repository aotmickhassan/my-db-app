<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
    ];

    /**
     * Accessor to get the full public URL of the image.
     * Usage: $image->url
     */
    public function getUrlAttribute(): string
    {
        if (!$this->path) {
            return '';
        }

        if (str_starts_with($this->path, 'http://') || str_starts_with($this->path, 'https://')) {
            return $this->path;
        }

        // If path already starts with 'images/', e.g. 'images/abc.jpg'
        if (str_starts_with($this->path, 'images/')) {
            return asset('storage/' . $this->path);
        }

        // If path is only the filename, e.g. 'abc.jpg'
        return asset('storage/images/' . $this->path);
    }
}
