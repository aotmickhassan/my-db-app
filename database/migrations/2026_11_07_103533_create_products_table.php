<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
           $table->id();
        // Foreign Keys
        $table->foreignId('category_id')->constrained()->cascadeOnDelete();
        $table->foreignId('brand_id')->constrained()->cascadeOnDelete();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); 
        
        // Product Details
        $table->string('title');
        $table->string('sub_title')->nullable();
        $table->text('short_description')->nullable();
        $table->longText('description')->nullable();
        $table->string('image')->nullable();
        $table->boolean('status')->default(1);
        
        // JSON ফিল্ড (একাধিক সাইজ ও কালার রাখার জন্য)
        $table->json('size')->nullable(); 
        $table->json('color')->nullable(); 
        
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
