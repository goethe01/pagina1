<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'index')-> name('index');
Route::view('/products', 'products') -> name('product');
Route::view('/oferta', 'ofertas') ->name('ofertas');
Route::view('/contacto', 'contact') ->name('contact');