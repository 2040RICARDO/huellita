<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Refugio;
use App\Models\Mascota;
use App\Models\Campana;
use App\Models\Voluntario;
use App\Models\Extravio;
use App\Models\MascotaAdoptante;


class ReporteController extends Controller
{
    public function refugio($estado){
        
        $refugios=Refugio::select('refujio.*')
                        ->where(function($query)use($estado){
                            if($estado != 4){
                                $query->where('estado',$estado);
                            }
                        })
                        ->orderBy('nombre')
                        ->orderBy('id')
                        ->get();
        $pdf = Pdf::loadView('reporte.refugio',compact('refugios'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }

    public function mascota($estado,$adoptado,$tipo_animal){

        $mascotas=Mascota::select('mascota.*','tipo_animal.tipo','refujio.nombre as refugio')
                        ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                        ->join('refujio','refujio.id','=','mascota.refujio_id')
                        ->where(function($query)use($estado,$adoptado,$tipo_animal){
                            if($estado != 4){
                                $query->where('estado_vida',$estado);
                            }

                            if($adoptado != 4){
                                $query->where('adoptado',$adoptado);
                            }

                            if($tipo_animal != 0){  
                                $query->where('tipoanimal_id',$tipo_animal);

                            }
                        })
                        ->orderBy('nombre')
                        ->get();



        $pdf = Pdf::loadView('reporte.mascota',compact('mascotas'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }


    public function campana($estado){
        
        $campanas=Campana::select('campana.*','refujio.nombre as refugio')
                            ->join('refujio','refujio.id','=','campana.refujio_id')
                            ->where(function($query)use($estado){
                                if($estado != 4){
                                    $query->where('campana.estado',$estado);
                                }
                            })
                            ->orderBy('campana.nombre')
                            ->get();


        $pdf = Pdf::loadView('reporte.campana',compact('campanas'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }

    public function voluntario($estado){
        
        $voluntarios= Voluntario::select('voluntario.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular','refujio.nombre as refugio')
                            ->join('persona','persona.id','=','voluntario.persona_id')
                            ->join('refujio','refujio.id','=','voluntario.refujio_id')
                            ->where(function($query)use($estado){
                                if($estado != 4){
                                    $query->where('voluntario.estado',$estado);
                                }
                            })
                            ->orderBy('nombre')
                            ->get();


        $pdf = Pdf::loadView('reporte.voluntario',compact('voluntarios'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }

    public function extravio($estado){
        
        $extravios = Extravio::select('extravio.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
                            ->join('persona','persona.id','=','extravio.persona_id')
                            ->where(function($query)use($estado){
                                if($estado != 4){
                                    $query->where('extravio.estado',$estado);
                                }
                            })
                            ->orderBy('persona.nombre')
                            ->get();

        $pdf = Pdf::loadView('reporte.extravio',compact('extravios'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }

    public function adopcion($estado){
     
        if($estado == 0 ||$estado == 4 ){
            $adopciones_p = MascotaAdoptante::select('persona.nombre as nombre_adoptante',
            'persona.apellidos as apellidos_adoptante',
            'persona.ci as ci_adoptante',
            'persona.direccion as direccion_adoptante',
            'persona.celular as celular_adoptante',
            'adoptante.descripcion',
            'mascota_adoptante.id as id',
            'mascota_adoptante.fecha',
            'mascota_adoptante.gestion',
            'mascota_adoptante.estado as estado_adopcion')
        ->join('adoptante', 'adoptante.id', '=', 'mascota_adoptante.adoptante_id')
        ->join('persona', 'persona.id', '=', 'adoptante.persona_id')

        ->where(function($query)use($estado){
            if($estado == 0 ){
                $query->where('mascota_adoptante.estado',$estado);
            }else{
                $query->where('mascota_adoptante.estado',0);
            }
        })
        
        
        ->orderBy('mascota_adoptante.id')
        ->get();
        }
        

        if($estado == 1 || $estado == 2 || $estado == 4){
            $adopciones = MascotaAdoptante::select('persona.nombre as nombre_adoptante',
                        'persona.apellidos as apellidos_adoptante',
                        'persona.ci as ci_adoptante',
                        'persona.direccion as direccion_adoptante',
                        'persona.celular as celular_adoptante',
                        'adoptante.descripcion',
                        'mascota.nombre as nombre_mascota',
                        'mascota.edad',
                        'mascota.genero',
                        'mascota.raza',
                        'mascota.color',
                        'mascota.estado_vida',
                        'mascota.descripcion as descripcion_mascota',
                        'mascota.imagen_mascota',
                        'tipo_animal.tipo as tipo_animal',
                        'refujio.nombre as refugio',
                        'mascota_adoptante.id as id',
                        'mascota_adoptante.fecha',
                        'mascota_adoptante.gestion',
                        'mascota_adoptante.estado as estado_adopcion')
                ->join('mascota', 'mascota.id', '=', 'mascota_adoptante.mascota_id')
                ->join('adoptante', 'adoptante.id', '=', 'mascota_adoptante.adoptante_id')
                ->join('persona', 'persona.id', '=', 'adoptante.persona_id')
                ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                ->join('refujio','refujio.id','=','mascota.refujio_id')
                ->where(function($query)use($estado){
                    if($estado == 1 || $estado == 2){
                        $query->where('mascota_adoptante.estado',$estado);
                    }else{
                        $query->whereIn('mascota_adoptante.estado',[1,2]);
                    }
                })
                
                ->orderBy('mascota_adoptante.id')
                ->get();
        }

        if($estado == 0){
            $adopciones =$adopciones_p;
        }
        if(isset($adopciones_p)){
            $adopciones = $adopciones->merge($adopciones_p);  
        }
        
     


        $pdf = Pdf::loadView('reporte.adopcion',compact('adopciones'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }

    public function adopciond($id){
        $adopcion = MascotaAdoptante::select('persona.nombre as nombre_adoptante',
            'persona.apellidos as apellidos_adoptante',
            'persona.ci as ci_adoptante',
            'persona.direccion as direccion_adoptante',
            'persona.celular as celular_adoptante',
            'adoptante.descripcion',
            'mascota.nombre as nombre_mascota',
            'mascota.edad',
            'mascota.nombre as mascota',
            'mascota.genero',
            'mascota.raza',
            'mascota.color',
            'mascota.descripcion as descripcion_mascota',
            'mascota.imagen_mascota',
            'mascota.estado_vida',
            'tipo_animal.tipo as tipo_animal',
            'refujio.nombre as refugio',
            'mascota_adoptante.id as id',
            'mascota_adoptante.fecha',
            'mascota_adoptante.gestion',
            'mascota_adoptante.estado as estado_adopcion',
            'mascota_adoptante.mascota_id'
            )
            ->join('mascota', 'mascota.id', '=', 'mascota_adoptante.mascota_id')
            ->join('adoptante', 'adoptante.id', '=', 'mascota_adoptante.adoptante_id')
            ->join('persona', 'persona.id', '=', 'adoptante.persona_id')
            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
            ->join('refujio','refujio.id','=','mascota.refujio_id')
            ->where('mascota_adoptante.id',$id)
            ->first();
  
        $pdf = Pdf::loadView('reporte.adopciond',compact('adopcion'));
        $pdf->set_paper("A4", "portrait");
        return $pdf->stream();

    }
}
