<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'brand_id',
        'user_id',
        'title',
        'sub_title',
        'short_description',
        'description',
        'image',
        'status',
        'size',
        'color',
    ];

    protected $casts = [
        'status' => 'boolean',
        'size' => 'array',
        'color' => 'array',
    ];

    // ================= RELATIONSHIPS =================

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}