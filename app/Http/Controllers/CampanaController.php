<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campana;
use App\Models\Refugio;
use Inertia\Inertia;
use Validator;
use Intervention\Image\Facades\Image;

class CampanaController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $campanas=Campana::select('campana.*','refujio.nombre as refugio')
                            ->join('refujio','refujio.id','=','campana.refujio_id')
                            ->orderBy('nombre')
                            ->get();
     
        return Inertia::render('Campana/Index',['campanas'=>$campanas]);

        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $refugios=Refugio::select('id','nombre')->where('estado',true)->orderBy('nombre')->get();
        return Inertia::render('Campana/Create',['refugios'=>$refugios]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'celular' => 'required|numeric',
                'direccion' => 'required',
                'fechaRango' => 'required',
                'descripcion' => 'required',
                'refugioId' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }

            
            $fecha=explode('/',$request->fechaRango);
            $campana =new Campana;
            $campana->nombre = $request->nombre;
            $campana->descripcion =$request->descripcion;
            $campana->direccion =$request->direccion;
            $campana->ubicacion =$request->ubicacion;
            $campana->celular =$request->celular;
            $campana->fecha_inicio =trim($fecha[0]);
            $campana->fecha_final =trim($fecha[1]);
            $campana->refujio_id =$request->refugioId;
            $campana->save();

            if (isset($request->fotografia) && $request->hasfile('fotografia')) {          
                $file = $request->file('fotografia'); 
                $filename =  "img_campana_".time()."".$campana->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_campana/'.$filename));
                $campana->imagen_campana=$filename;
                $campana->update();
            }
            return redirect()->route('campana.index');

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
        $refugios=Refugio::select('id','nombre')->where('estado',true)->orderBy('nombre')->get();
        $campana =Campana::find($id);
  
        return Inertia::render('Campana/Edit',['refugios'=>$refugios,'campana'=>$campana]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'celular' => 'required|numeric',
                'direccion' => 'required',
                'fechaRango' => 'required',
                'descripcion' => 'required',
                'refugioId' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
            $fecha=explode('/',$request->fechaRango);
            $campana =Campana::find($request->id);
            $campana->nombre = $request->nombre;
            $campana->descripcion =$request->descripcion;
            $campana->direccion =$request->direccion;
            $campana->ubicacion =$request->ubicacion;
            $campana->celular =$request->celular;
            $campana->fecha_inicio =trim($fecha[0]);
            $campana->fecha_final =trim($fecha[1]);
            $campana->refujio_id =$request->refugioId;
            $campana->estado =$request->estado == 0?false:true;
            $campana->save();

            if(!empty($request->fotografia) && $request->fotografia != $campana->imagen_campana){        
                $file = $request->file('fotografia'); 
                $filename =  "img_campana_".time()."".$campana->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_campana/'.$filename));
                $campana->imagen_campana=$filename;
                
            }
            if(empty($request->fotografia))
                $campana->imagen_campana=null;

            $campana->update();
            return redirect()->route('campana.index');
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
