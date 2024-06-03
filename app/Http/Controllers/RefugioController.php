<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

use App\Models\Refugio;

class RefugioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      
        $refugios= Refugio::orderBy('nombre')->get();
        return Inertia::render('Refugio/Index',['refugios'=>$refugios]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Refugio/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:200',
                'direccion' => 'required|min:3|max:200',
                'ubicacion' => 'min:5|max:200',
                'telefono' => 'numeric',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
         
            $data = [
                'nombre' => trim(strtoupper($request->nombre)),
                'direccion' => trim(strtoupper($request->direccion)),
                'ubicacion' => trim(strtoupper($request->ubicacion)),
                'telefono' => trim($request->telefono),
            ];
        
            Refugio::create($data);
            return redirect()->route('refugio.index');
     
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
    public function edit(Refugio $refugio)
    {
        try {
            return Inertia::render('Refugio/Edit',['refugio'=>$refugio]);
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Refugio $refugio)
    {
        try {
           
            $validator = Validator::make($request->all(),[
                'nombre' => 'required|min:3|max:200',
                'direccion' => 'required|min:3|max:200',
                'ubicacion' => 'min:5|max:200',
                'telefono' => 'numeric',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
         
            $data = [
                'nombre' => trim(strtoupper($request->nombre)),
                'direccion' => trim(strtoupper($request->direccion)),
                'ubicacion' => trim(strtoupper($request->ubicacion)),
                'telefono' => trim($request->telefono),
                'estado' => $request->estado == 1?true:false,
            ];
            $refugio->update($data);
            return redirect()->route('refugio.index');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Refugio $refugio)
    {
        $refugio->delete();
        return redirect()->route('refugio.index');
    }
}
