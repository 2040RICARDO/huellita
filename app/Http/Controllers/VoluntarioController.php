<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

use App\Models\Voluntario;
use App\Models\Persona;
use App\Models\Refugio;

class VoluntarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voluntarios= Voluntario::select('voluntario.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular','refujio.nombre as refugio')
                            ->join('persona','persona.id','=','voluntario.persona_id')
                            ->join('refujio','refujio.id','=','voluntario.refujio_id')
                            ->orderBy('nombre')
                            ->get();
        return Inertia::render('Voluntario/Index',['voluntarios'=>$voluntarios]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $refugios=Refugio::select('id','nombre')->where('estado',true)->orderBy('nombre')->get();
        return Inertia::render('Voluntario/Create',['refugios'=>$refugios]);
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
                'refugioId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            $persona=new Persona;
            $persona->nombre = $request->nombre;
            $persona->apellidos =  $request->apellidos;
            $persona->ci = $request->ci;
            $persona->direccion =  $request->direccion;
            $persona->celular = $request->celular;
            $persona->save();

            $voluntario=new Voluntario;
            $voluntario->refujio_id=$request->refugioId;
            $voluntario->persona_id=$persona->id;
            $voluntario->save();

            return redirect()->route('voluntario.index');
     
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
    public function edit($id)
    {
        try {
         
            $voluntario = Voluntario::select('voluntario.*','persona.nombre','persona.apellidos','persona.ci','persona.direccion','persona.celular','refujio.nombre as refugio')
            ->join('persona','persona.id','=','voluntario.persona_id')
            ->join('refujio','refujio.id','=','voluntario.refujio_id')
            ->where('voluntario.id',$id)
            ->first();

            $refugios=Refugio::select('id','nombre')->where('estado',true)->orderBy('nombre')->get();

            return Inertia::render('Voluntario/Edit',['voluntario'=>$voluntario,'refugios'=>$refugios]);
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voluntario $voluntario)
    {
        try {
           
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:2255',
                'apellidos' => 'required|min:3|max:255',
                'ci' => 'required|min:3|max:12',
                'celular' => 'required',
                'refugioId' => 'required',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $voluntario->refujio_id=$request->refugioId;
            $voluntario->estado=$request->estado == 1?true:false;
            $voluntario->update();
            $persona=Persona::find($voluntario->persona_id);
            $persona->nombre = trim(strtoupper($request->nombre));
            $persona->apellidos =  trim(strtoupper($request->apellidos));
            $persona->ci = trim(strtoupper($request->ci));
            $persona->direccion =  trim(strtoupper($request->direccion));
            $persona->celular = trim(strtoupper($request->celular));
            $persona->update();

        
            return redirect()->route('voluntario.index');

        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voluntario $voluntario)
    {
      
    }
}
