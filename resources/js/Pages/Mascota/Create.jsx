
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PlusCircle } from 'react-feather';
export default function CreateMascota({auth,refugios,animales}){
    
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        raza: '',
        color: '',
        edad: '',
        genero: 'MACHO',
        descripcion:'',
        fotografia: null,
        tipoId: animales.length != 0 ?animales[0].id:'',
        refugioId: refugios.length != 0 ?refugios[0].id:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mascota.store'));
    };

    const [previewImage, setPreviewImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('fotografia', file); 

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const clearPreviewImage = () => {
        setData({ ...data, fotografia: null });
        setPreviewImage(null); 
    };


  return (
    
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Mascota</h2>}
        >

        <div  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-20 mr-20">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <PlusCircle /> 
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {/* noMBRE */}
                    </h3>
                </div>
            </div>
            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">



                    <div className="-mx-3 md:flex mb-2">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Nombre
                            </label>
                            <TextInput
                                id="nombre"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                required
                                autoComplete="nombre"
                            />
                            <InputError className="text-red text-xs italic" message={errors.nombre} />
                            
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Raza
                            </label>
                            <TextInput
                                id="raza"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.raza}
                                onChange={(e) => setData('raza', e.target.value)}
                                required
                                autoComplete="raza"
                            />
                            <InputError className="text-red text-xs italic" message={errors.raza} />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                Color
                            </label>
                            <TextInput
                                id="color"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                required
                                autoComplete="color"
                            />
                            <InputError className="text-red text-xs italic" message={errors.color} />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                EDAD
                            </label>
                            <TextInput
                                id="edad"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.edad}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ''); 
                                    setData('edad', value);
                                }}
                                required
                                autoComplete="edad"
                            />
                            <InputError className="text-red text-xs italic" message={errors.edad} />


                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                GÉNERO
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center rounded-lg border border-gray-300 p-2 hover:border-blue-500 transition-all duration-300 mr-16" >
                                    <input
                                        type="radio"
                                        className="appearance-none border-none w-5 h-5 checked:bg-blue-500 checked:border-transparent checked:text-white"
                                        name="genero"
                                        value="MACHO"
                                        checked={data.genero === 'MACHO'}
                                        onChange={(e) => setData('genero', e.target.value)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">MACHO</span>
                                </label>
                                <label className="inline-flex items-center rounded-lg border border-gray-300 p-2 hover:border-blue-500 transition-all duration-300">
                                    <input
                                        type="radio"
                                        className="appearance-none border-none w-5 h-5 checked:bg-blue-500 checked:border-transparent checked:text-white"
                                        name="genero"
                                        value="HEMBRA"
                                        checked={data.genero === 'HEMBRA'}
                                        onChange={(e) => setData('genero', e.target.value)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">HEMBRA</span>
                                </label>
                            </div>
                            <InputError className="text-red text-xs italic" message={errors.genero} />
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tipoId">
                                TIPO / ESPECIE 
                            </label>
                            <select
                                id="tipoId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.tipoId}
                                onChange={(e) => setData('tipoId', e.target.value)}
                                required
                            >

                      
                                {animales.map((animal) => (
                                    <option key={animal.id} value={animal.id}>{animal.tipo}</option>
                                ))}
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.tipoId} />


                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tipoId">
                                REFUGIO
                            </label>
                            <select
                                id="refugioId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.refugioId}
                                onChange={(e) => setData('refugioId', e.target.value)}
                                required
                            >
                                {refugios.map((refugio) => (
                                    <option key={refugio.id} value={refugio.id}>{refugio.nombre}</option>
                                ))}
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.refugioId} />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Descripcion
                            </label>
                            <textarea
                                id="descripcion"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 resize-none"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                required
                                autoComplete="descripcion"
                                rows="4" 
                            />
                            <InputError className="text-red text-xs italic" message={errors.descripcion} />


                        </div>
                        <div className="md:w-1/2 px-3 relative">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                htmlFor="fotografia"
                            >
                                Fotografía Mascota
                            </label>
                            <input
                                id="fotografia"
                                type="file"
                                className="hidden" 
                                onChange={handleFileChange} 
                                autoComplete="fotografia"
                                accept="image/*" 
                            />
              
                            <label
                                htmlFor="fotografia"
                                className="block w-full bg-gray-200 text-gray-600 border border-gray-300 rounded py-3 px-4 mb-3 cursor-pointer hover:bg-gray-300"
                            >
                                {previewImage ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                            </label>
                     
                            {previewImage && (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        alt="Vista previa"
                                        className="w-full rounded"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                            
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all duration-300 focus:outline-none"
                                        onClick={clearPreviewImage}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            <InputError className="text-red text-xs italic" message={errors.fotografia} />
                        </div>
                    </div>
                    
                
                  
            
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Registrar
                        </PrimaryButton>
                        <Link href={route('refugio.index')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>
                
                    </div> 
                </form>
            </div>
            
        </div>

      
    </AuthenticatedLayout>
  )
}


