<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extravio extends Model
{
    
    protected $table='extravio';
    public $timestamps = true;

    protected $fillable = [
        'fecha_extravio',
        'descripcion',
        'imagen_extravio',
        'persona_id',
        'estado',
    ];
}
