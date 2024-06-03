
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { PlusCircle } from 'react-feather';
export default function CreateRefugio({auth}){
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        direccion: '',
        ubicacion: '',
        telefono: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('refugio.store'));
    };


  return (
    
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuevo Refugio</h2>}
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

                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                        Nombre del refugio
                    </label>
                    <TextInput
                            id="nombre"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value.toUpperCase() )}
                            required
                            autoComplete="nombre"
                        />
                        <InputError className="text-red text-xs italic" message={errors.nombre} />
                    </div>
                    
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                        Direccion
                    </label>
                    <TextInput
                            id="direccion"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                            value={data.direccion}
                            onChange={(e) => setData('direccion', e.target.value.toUpperCase())}
                            required
                            autoComplete="direccion"
                        />
                        <InputError className="text-red text-xs italic" message={errors.direccion} />


                    </div>
                    <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                        Ubicacion
                    </label>
                    <TextInput
                            id="ubicacion"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                            value={data.ubicacion}
                            onChange={(e) => setData('ubicacion', e.target.value.toUpperCase())}
                            required
                            autoComplete="ubicacion"
                        />
                        <InputError className="text-red text-xs italic" message={errors.ubicacion} />
                    </div>
                </div>
                
                <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                        Telefono
                    </label>
                    <TextInput
                        id="telefono"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        value={data.telefono}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); 
                            setData('telefono', value);
                        }}
                        required
                        autoComplete="telefono"
                    />
                    <InputError className="text-red text-xs italic" message={errors.telefono} />
                    
                    </div>
                    <div className="md:w-1/2 px-3">
                    
                    </div>
                    <div className="md:w-1/2 px-3">
                    
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


