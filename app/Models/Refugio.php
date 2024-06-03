<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refugio extends Model
{

    protected $table='refujio';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'direccion',
        'ubicacion',
        'telefono',
        'estado',
    ];
}
