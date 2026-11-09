<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\BrandController;

Route::inertia('/', 'welcome')->name('home');

Route::view('/upload', 'upload')->name('upload.view');
Route::post("/upload",[ImageController::class,'upload'])->name('upload.post');
Route::get('/list',[ImageController::class,'list'])->name('upload.list');

Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');

// Brand Routes
Route::resource('brands', BrandController::class);

Route::prefix('{current_team}')
->middleware(['auth', 'verified', EnsureTeamMembership::class])
->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
