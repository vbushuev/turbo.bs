<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain(env('ADMIN_DOMAIN'))->group(function(){
    Route::get('/', 'AdminController@index')->name('admin');
});

Route::get('/', function () {
    return view('start');
});

Route::middleware(['auth'])->group(function(){
    Route::get('/admin', 'AdminController@index')->name('admin');
    Route::resource('home', 'HomeController');
    Route::resource('file', 'FileController');
    Route::resource('report', 'ReportController');
    Route::resource('company', 'CompanyController');
});
Auth::routes();
