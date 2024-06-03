<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

use App\Models\TipoAnimal;

class TipoAnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      
        $animales= TipoAnimal::orderBy('tipo')->get();
        return Inertia::render('TipoAnimal/Index',['animales'=>$animales]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TipoAnimal/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(),[
                'tipo' => 'required|min:3|max:255',
    
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
         
            $data = [
                'tipo' => trim(strtoupper($request->tipo)),
            ];
        
            TipoAnimal::create($data);
            return redirect()->route('tipoAnimal.index');
     
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
            $animal=TipoAnimal::find($id);
    
            return Inertia::render('TipoAnimal/Edit',['animal'=>$animal]);
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
   
            $validator = Validator::make($request->all(),[
                'tipo' => 'required|min:3|max:255',
              
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
         
            $data = [
                'tipo' => trim(strtoupper($request->tipo)),
            ];
            $animal=TipoAnimal::find($request->id);
            $animal->update($data);
            return redirect()->route('tipoAnimal.index');
        } catch (\Exception $e) {

            return response()->json(['error'=>$e]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $animal=TipoAnimal::find($id);
            $animal->delete();
            return redirect()->route('tipo_animal.index');
        } catch (\Exception $e) {
            return response()->json(['error'=>$e]);
        }
    }
}
