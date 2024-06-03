<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Models\Mascota;
use App\Models\Campana;
use App\Models\Extravio;

class WelcomeController extends Controller
{

    public function index()
    {
        $mascotas=Mascota::select('mascota.*','tipo_animal.tipo','refujio.nombre as refugio')
                            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                            ->join('refujio','refujio.id','=','mascota.refujio_id')
                            ->where([['adoptado',false],['estado_vida',true]])
                            ->orderBy('nombre')
                            ->get()->take(5);

        $campanas=Campana::select('campana.*','refujio.nombre as refugio')
                            ->join('refujio','refujio.id','=','campana.refujio_id')
                            ->where('campana.estado',true)
                            ->orderBy('nombre')
                            ->get()->take(6);
                   

        $extravios = Extravio::select('extravio.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
                            ->join('persona','persona.id','=','extravio.persona_id')
                            ->orderBy('persona.nombre')
                            ->where('estado',true)
                            ->get()->take(6);


        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'mascotas' => $mascotas,
            'campanas' => $campanas,
            'extravios' => $extravios,
        ]);
    }


    public function ver_mas($tipo){
        $mascotas=null;
        $campanas=null;
        $extravios=null;

        if($tipo == 'campana'){

            $campanas=Campana::select('campana.*','refujio.nombre as refugio')
            ->join('refujio','refujio.id','=','campana.refujio_id')
            ->where('campana.estado',true)
            ->orderBy('nombre')
            ->orderBy('campana.id')
            ->get();
        }else if ($tipo == 'mascota'){
            $mascotas=Mascota::select('mascota.*','tipo_animal.tipo','refujio.nombre as refugio')
            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
            ->join('refujio','refujio.id','=','mascota.refujio_id')
            ->where([['adoptado',false],['estado_vida',true]])
            ->orderBy('nombre')
            ->orderBy('mascota.id')
            ->get();
       
        }else if($tipo == 'extravio'){
            $extravios = Extravio::select('extravio.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
            ->join('persona','persona.id','=','extravio.persona_id')
            ->orderBy('persona.nombre')
            ->where('estado',true)
            ->orderBy('extravio.id')
            ->get();
        }

        





        return Inertia::render('ListaWelcome',['campanas'=>$campanas,'mascotas'=>$mascotas,'extravios'=>$extravios,'tipo'=>$tipo]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
