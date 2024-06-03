<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MascotaAdoptante;
use App\Models\Mascota;
use App\Models\Persona;
use App\Models\Adoptante;
use Inertia\Inertia;
use Validator;
use Intervention\Image\Facades\Image;
use Auth;
use Illuminate\Support\Facades\Redirect;

class AdopcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

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
                                ->where('mascota_adoptante.estado',0)
                                ->orderBy('mascota_adoptante.id')
                                ->get();
     

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
                                        ->whereIn('mascota_adoptante.estado',[1,2])
                                        ->orderBy('mascota_adoptante.id')
                                        ->get();

        
        $adopciones = $adopciones->merge($adopciones_p);

        return Inertia::render('Adopcion/Index',['adopciones'=>$adopciones,'adopciones_p'=>$adopciones_p]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $mascotas=Mascota::select('mascota.id','nombre','tipo','imagen_mascota','genero')
                            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                            ->where([['adoptado',false],['estado_vida',true]])
                            ->orderBy('tipo')
                            ->orderBy('mascota.id')
                            ->orderBy('mascota.genero')
                            ->get();
        return Inertia::render('Adopcion/Create',['mascotas'=>$mascotas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        try {

            
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:2255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:12',
                'direccion' => 'required|min:3',
                'celular' => 'required',
                'descripcion' => 'required',
                'fecha' => 'required',
                'mascotaId' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
       
            $per_exis=Persona::select('id')->where('ci',trim(strtoupper($request->ci)))->first();
     
            if($per_exis != null){
                $persona = Persona::find($per_exis->id);
            }else{
                $persona=new Persona;
                $persona->nombre = trim(strtoupper($request->nombre));
                $persona->apellidos = trim(strtoupper( $request->apellidos));
                $persona->ci = trim(strtoupper($request->ci));
                $persona->direccion =  trim(strtoupper($request->direccion));
                $persona->celular = trim(strtoupper($request->celular));
                $persona->save();
            }


            $adoptante=new Adoptante;
            $adoptante->descripcion=$request->descripcion;
            $adoptante->persona_id=$persona->id;
            $adoptante->save();

            $mascota_adoptante = new MascotaAdoptante;
            $mascota_adoptante->mascota_id=$request->mascotaId;
            $mascota_adoptante->adoptante_id=$adoptante->id;
            $mascota_adoptante->fecha =$request->fecha;
            $mascota_adoptante->gestion=date('Y');
            $mascota_adoptante->estado = 1;
            $mascota_adoptante->user_id =Auth::user()->id;
            $mascota_adoptante->save();

            $mascota=Mascota::find($mascota_adoptante->mascota_id);
            $mascota->adoptado =true;
            $mascota->update();
            

            return redirect()->route('adopcion.index');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    public function adopcion_p_store(Request $request)
    {
    
        try {

            
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:2255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:12',
                'direccion' => 'required|min:3',
                'celular' => 'required',
                'descripcion' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
       
            $per_exis=Persona::select('id')->where('ci',trim(strtoupper($request->ci)))->first();
     
            if($per_exis != null){
                $persona = Persona::find($per_exis->id);
            }else{
                $persona=new Persona;
                $persona->nombre = trim(strtoupper($request->nombre));
                $persona->apellidos = trim(strtoupper( $request->apellidos));
                $persona->ci = trim(strtoupper($request->ci));
                $persona->direccion =  trim(strtoupper($request->direccion));
                $persona->celular = trim(strtoupper($request->celular));
                $persona->save();
            }


            $adoptante=new Adoptante;
            $adoptante->descripcion=$request->descripcion;
            $adoptante->persona_id=$persona->id;
            $adoptante->save();

            $mascota_adoptante = new MascotaAdoptante;
            $mascota_adoptante->adoptante_id=$adoptante->id;
            $mascota_adoptante->gestion=date('Y');
            $mascota_adoptante->estado = 0;
            $mascota_adoptante->save();

            return redirect()->route('welcome');

           

        } catch (\Exception $e) {
            
            return response()->json(['success' => 'OCUURIO UN PROBLEMA!!']);
            //return response()->json(['error'=>$e]);
        }
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
    public function edit( $id)
    {
        $ad=MascotaAdoptante::find($id);
        if($ad->mascota_id != null){
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
        }else{
            $adopcion = MascotaAdoptante::select('persona.nombre as nombre_adoptante',
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
                                ->where('mascota_adoptante.id',$id)
                                ->first();
        }
        
        



        if($ad->mascota_id != null){
            $mascota=Mascota::select('mascota.id','nombre','tipo','imagen_mascota','genero')
            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
            ->where('mascota.id',$adopcion->mascota_id)
            ->first();  
        }
                                    

        $mascotas=Mascota::select('mascota.id','nombre','tipo','imagen_mascota','genero')
                            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                            ->where([['adoptado',false],['estado_vida',true]])
                            ->orderBy('tipo')
                            ->orderBy('mascota.id')
                            ->orderBy('mascota.genero')
                            ->get();
        if($ad->mascota_id != null){
            $mascotas->push($mascota);
        }
        

        return Inertia::render('Adopcion/Edit',['adopcion'=>$adopcion,'mascotas'=>$mascotas]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {

            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:2255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:12',
                'direccion' => 'required|min:3',
                'celular' => 'required',
                'descripcion' => 'required',
                'fecha' => 'required',
                'mascotaId' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
       
            $per_exis=Persona::select('id')->where('ci',trim(strtoupper($request->ci)))->first();
            if($per_exis != null){
                $persona = Persona::find($per_exis->id);
            }else{
                $persona=new Persona;
            }
            $persona->nombre = trim(strtoupper($request->nombre));
            $persona->apellidos = trim(strtoupper( $request->apellidos));
            $persona->ci = trim(strtoupper($request->ci));
            $persona->direccion =  trim(strtoupper($request->direccion));
            $persona->celular = trim(strtoupper($request->celular));
            if($per_exis != null){
                $persona->update();
            }else{
                $persona->save();
            }

            $mascota_adoptante = MascotaAdoptante::find($id);
            $mascota_edit=$mascota_adoptante->mascota_id;
            $mascota_adoptante->mascota_id=$request->mascotaId;
            $mascota_adoptante->fecha =$request->fecha;
            $mascota_adoptante->estado = $request->estado;
            $mascota_adoptante->user_id =Auth::user()->id;
            $mascota_adoptante->update();

            $mascota=Mascota::find( $mascota_adoptante->mascota_id);
            $mascota->adoptado = ($request->estado == 0 || $request->estado == 1) ? true:false;
            $mascota->update();

            if( $mascota_edit != null && ($mascota_edit != $mascota_adoptante->mascota_id)){
                $mascota_e=Mascota::find($mascota_edit);
                $mascota_e->adoptado=false;
                $mascota_e->update();
            }elseif($mascota_edit == null){
                $mascota=Mascota::find($mascota_adoptante->mascota_id);
                $mascota->adoptado =true;
                $mascota->update();
            }


            $adoptante=Adoptante::find( $mascota_adoptante->adoptante_id);
            $adoptante->descripcion=$request->descripcion;
            $adoptante->persona_id=$persona->id;
            $adoptante->update();

            return redirect()->route('adopcion.index');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
