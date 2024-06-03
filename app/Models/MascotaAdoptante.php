<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MascotaAdoptante extends Model
{
    use HasFactory;
    protected $table='mascota_adoptante';
    public $timestamps = true;
}
