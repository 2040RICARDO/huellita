<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Extravio;
use App\Models\Persona;
use Inertia\Inertia;
use Validator;
use Intervention\Image\Facades\Image;

class ExtravioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $extravios = Extravio::select('extravio.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
                            ->join('persona','persona.id','=','extravio.persona_id')
                            ->orderBy('persona.nombre')
                            ->get();
     
        return Inertia::render('Extravio/Index',['extravios'=>$extravios]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('Extravio/Create');
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
                'celular' => 'required',
                'fechaExtravio' => 'required',
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
            

            $extravio=new Extravio;
            $extravio->fecha_extravio=$request->fechaExtravio;
            $extravio->descripcion=$request->descripcion;
            $extravio->estado=$request->estado;
            $extravio->persona_id=$persona->id;
            $extravio->save();

            
            if (isset($request->fotografia) && $request->hasfile('fotografia')) {          
                $file = $request->file('fotografia'); 
                $filename =  "img_extravio_".time()."".$extravio->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_extravio/'.$filename));
                $extravio->imagen_extravio=$filename;
                $extravio->update();
            }
            return redirect()->route('extravio.index');

        } catch (\Exception $e) {
            
            return response()->json(['error'=>$e]);
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
    public function edit(string $id)
    {
        $extravio = Extravio::select('extravio.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular')
        ->join('persona','persona.id','=','extravio.persona_id')
        ->where('extravio.id',$id)
        ->first();
  
        return Inertia::render('Extravio/Edit',['extravio'=>$extravio]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
         
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:2255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:12',
                'celular' => 'required',
                'fechaExtravio' => 'required',
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
            


            $extravio=Extravio::find($request->id);
            $extravio->fecha_extravio=$request->fechaExtravio;
            $extravio->descripcion=$request->descripcion;
            $extravio->estado=$request->estado;
            $extravio->persona_id=$persona->id;
            $extravio->update();


            if(!empty($request->fotografia) && $request->fotografia != $extravio->imagen_extravio){
                $file = $request->file('fotografia'); 
                $filename =  "img_extravio_".time()."".$extravio->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_extravio/'.$filename));
                $extravio->imagen_extravio=$filename;

            }
            if(empty($request->fotografia))
                $extravio->imagen_extravio=null;

            $extravio->update();
            
            return redirect()->route('extravio.index');

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
