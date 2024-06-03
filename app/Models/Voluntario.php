<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voluntario extends Model
{
   
    protected $table='voluntario';
    public $timestamps = true;
    protected $fillable = [
        'persona_id',
        'refujio_id',
        'estado',
    ];
}
