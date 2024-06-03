<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAnimal extends Model
{
    protected $table='tipo_animal';
    public $timestamps = true;

    protected $fillable = [
        'tipo',
    ];
}
