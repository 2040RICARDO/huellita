<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mascota;
use App\Models\Refugio;
use App\Models\TipoAnimal;
use Inertia\Inertia;
use Validator;
use Intervention\Image\Facades\Image;

class MascotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mascotas=Mascota::select('mascota.*','tipo_animal.tipo','refujio.nombre as refugio')
                            ->join('tipo_animal','tipo_animal.id','=','mascota.tipoanimal_id')
                            ->join('refujio','refujio.id','=','mascota.refujio_id')
                            ->orderBy('nombre')
                            ->get();
        $animales = TipoAnimal::all();                           
     
        return Inertia::render('Mascota/Index',['mascotas'=>$mascotas,'animales'=>$animales]);

        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $refugios=Refugio::select('id','nombre')->where('estado',true)->orderBy('nombre')->get();
        $animales=TipoAnimal::select('id','tipo')->orderBy('tipo')->get();
        return Inertia::render('Mascota/Create',['refugios'=>$refugios,'animales'=>$animales]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'genero' => 'required',
                'tipoId' => 'required',
                'refugioId' => 'required',
                'descripcion' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
          
            $mascota =new Mascota;
            $mascota->nombre = $request->nombre;
            $mascota->edad =$request->edad;
            $mascota->genero =$request->genero;
            $mascota->raza =$request->raza;
            $mascota->color =$request->color;
            $mascota->descripcion =$request->descripcion;
            $mascota->tipoanimal_id =$request->tipoId;
            $mascota->refujio_id =$request->refugioId;
            $mascota->save();

            if (isset($request->fotografia) && $request->hasfile('fotografia')) {          
                $file = $request->file('fotografia'); 
                $filename =  "img_mascota_".time()."".$mascota->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_mascota/'.$filename));
                $mascota->imagen_mascota=$filename;
                $mascota->update();
            }
            return redirect()->route('mascota.index');

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
        $animales=TipoAnimal::select('id','tipo')->orderBy('tipo')->get();
        $mascota =Mascota::find($id);
  
        return Inertia::render('Mascota/Edit',['refugios'=>$refugios,'animales'=>$animales,'mascota'=>$mascota]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
         
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:255',
                'genero' => 'required',
                'tipoId' => 'required',
                'refugioId' => 'required',
                'descripcion' => 'required',

            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            
            $mascota =Mascota::find($request->id);
            $mascota->nombre = $request->nombre;
            $mascota->edad =$request->edad;
            $mascota->genero =$request->genero;
            $mascota->raza =$request->raza;
            $mascota->color =$request->color;
            $mascota->descripcion =$request->descripcion;
            $mascota->tipoanimal_id =$request->tipoId;
            $mascota->refujio_id =$request->refugioId;
            $mascota->estado_vida =$request->estado_vida == 0?false:true;
            $mascota->update();

            if(!empty($request->fotografia) && $request->fotografia != $mascota->imagen_mascota){
                $file = $request->file('fotografia'); 
                $filename =  "img_mascota_".time()."".$mascota->id.".jpg";
                $image=Image::make($file);
                $image->resize(500, 600);
                $image->encode('jpg',100);
                $image->orientate()
                ->fit(500, 600, function ($constraint) {
                    $constraint->upsize();
                });
                $image->save(public_path('img_mascota/'.$filename));
                $mascota->imagen_mascota=$filename;

            }
            if(empty($request->fotografia))
                $mascota->imagen_mascota=null;

            $mascota->update();
            
            return redirect()->route('mascota.index');

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
