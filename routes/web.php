<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\RefugioController;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\CampanaController;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\TipoAnimalController;
use App\Http\Controllers\ExtravioController;
use App\Http\Controllers\AdopcionController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\UserController;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */
Route::post('adopcion_p',[AdopcionController::class, 'adopcion_p_store'])->name('adopcion_p');
Route::get('welcome_ver/{tipo}',[WelcomeController::class,'ver_mas'])->name('welcome_ver');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    ///////////REFUGIO //////////////////////
    Route::resource('refugio',RefugioController::class);
    ///////////REFUGIO //////////////////////

    ///////////TIPO ANIMAL //////////////////////
    Route::resource('tipoAnimal',TipoAnimalController::class);
    Route::post('tipoAnimal_a', [TipoAnimalController::class, 'update'])->name('tipoAnimal_a.actualizar');
    Route::post('tipoAnimal_s', [TipoAnimalController::class, 'store'])->name('tipoAnimal_s.registrar');
    ///////////TIPO ANIMAL //////////////////////


    ///////////MASCOTA //////////////////////
    Route::resource('mascota',MascotaController::class);
    Route::post('mascota_a', [MascotaController::class, 'update'])->name('mascota_a.actualizar');
    ///////////MASCOTA//////////////////////

    ///////////CAMPANA//////////////////////
    Route::resource('campana',CampanaController::class);
    Route::post('campana_a', [CampanaController::class, 'update'])->name('campana_a.actualizar');
    ///////////CAMPANA//////////////////////

     ///////////VOLUNTARIO//////////////////////
     Route::resource('voluntario',VoluntarioController::class);
      ///////////VOLUNTARIO//////////////////////

      ///////////EXTRAVIO//////////////////////
      Route::resource('extravio',ExtravioController::class);
      Route::post('extravio_a', [ExtravioController::class, 'update'])->name('extravio_a.actualizar');
      ///////////EXTRAVIO//////////////////////

      ///////////ADOPCION//////////////////////
      Route::resource('adopcion',AdopcionController::class);
      ///////////ADOPCION//////////////////////


        ////////////REPORTE////////////////////
        Route::get('refugio_r/reporte/{estado}', [ReporteController::class, 'refugio']);
        Route::get('mascota_r/reporte/{estado}/{adoptado}/{tipo_animal}', [ReporteController::class, 'mascota']);
        Route::get('campana_r/reporte/{estado}', [ReporteController::class, 'campana']);
        Route::get('voluntario_r/reporte/{estado}', [ReporteController::class, 'voluntario']);
        Route::get('extravio_r/reporte/{estado}', [ReporteController::class, 'extravio']);
        Route::get('adopcion_r/reporte/{estado}', [ReporteController::class, 'adopcion']);
        Route::get('adopcion_rd/reporte/{id}', [ReporteController::class, 'adopciond']);
        /////////////////REPORTE////////////

         /////////////////User////////////
         Route::get('user_a', [UserController::class, 'create'])->name('user_a.create');
         Route::post('user_s', [UserController::class, 'store'])->name('user_s.store');
         /////////////////User////////////
});

require __DIR__.'/auth.php';
