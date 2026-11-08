<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
    ];

    protected $appends = [
        'url',
    ];

    /**
     * Get the full URL for the image path.
     */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->path
                ? (filter_var($this->path, FILTER_VALIDATE_URL) ? $this->path : Storage::url($this->path))
                : null,
        );
    }
}
