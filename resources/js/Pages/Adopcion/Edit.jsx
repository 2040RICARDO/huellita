
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PlusCircle } from 'react-feather';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
export default function AdopcionEdit({auth,mascotas,adopcion}){
    const { data, setData, put, processing, errors } = useForm({
        nombre: adopcion.nombre_adoptante,
        apellidos: adopcion.apellidos_adoptante,
        ci: adopcion.ci_adoptante,
        direccion: adopcion.direccion_adoptante,
        celular: adopcion.celular_adoptante,
        descripcion: adopcion.descripcion,
        estado: adopcion.estado_adopcion,
        fecha: adopcion.fecha != null?adopcion.fecha:'',
        mascotaId:adopcion.mascota_id != null ?adopcion.mascota_id:(mascotas.length != 0 ?mascotas[0].id:''),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('adopcion.update', { adopcion: adopcion.id }));
   
    };


  return (
    
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Adopcion</h2>}
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
                                Nombre
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
                        <div className="md:w-full px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                Apellidos
                            </label>
                            <TextInput
                                id="apellidos"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.apellidos}
                                onChange={(e) => setData('apellidos', e.target.value.toUpperCase() )}
                                required
                                autoComplete="apellidos"
                            />
                            <InputError className="text-red text-xs italic" message={errors.apellidos} />
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                            ci
                        </label>
                        <TextInput
                                id="ci"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.ci}
                                onChange={(e) => setData('ci', e.target.value.toUpperCase())}
                                required
                                autoComplete="ci"
                            />
                            <InputError className="text-red text-xs italic" message={errors.ci} />


                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                celular
                            </label>
                            <TextInput
                                    id="celular"
                                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                    value={data.celular}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); 
                                        setData('celular', value);
                                    }}
                                    required
                                    autoComplete="celular"
                                />
                            <InputError className="text-red text-xs italic" message={errors.celular} />
                        </div>
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                direccion
                            </label>
                            <TextInput
                                id="direccion"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.direccion}
                                onChange={(e) => setData('direccion', e.target.value.toUpperCase())}
                                required
                                autoComplete="direccion"
                            />
                            <InputError className="text-red text-xs italic" message={errors.direccion} />
                        
                        </div>
                    </div>

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                fecha adopcion
                            </label>
                            <DatePicker
                                id="fecha"
                                selected={data.fecha}
                                onChange={(date) => {
                                    const year = date.getFullYear();
                                    const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                                    const day = date.getDate();
                                    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                    setData('fecha', formattedDate);
                                }}
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                            />
                            <InputError className="text-red text-xs italic" message={errors.fecha} />
                            
                        </div>
                        <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                            estado
                        </label>
                            <select
                                id="mascotaId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.estado}
                                onChange={(e) => setData('estado', e.target.value)}
                                required
                            >
                               
                                <option key="0" value={0}>PENDIENTE</option>
                                <option key="1" value={1}>ADOPTADO</option>
                                <option key="2" value={2}>RECHAZADO</option>
                               
                            </select>
                            <InputError className="text-red text-xs italic" message={errors.estado} />
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

                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                MASCOTA
                            </label>
                            <select
                                id="mascotaId"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.mascotaId}
                                onChange={(e) => setData('mascotaId', e.target.value)}
                                required
                            >
                                {mascotas.map((mascota) => (
                                    <option key={mascota.id} value={mascota.id}>
                                        {`${mascota.nombre} (${mascota.tipo} - ${mascota.genero})`}
                                    </option>
                                ))}
                            </select>

                            <InputError className="text-red text-xs italic" message={errors.mascotaId} />

                        </div>
                    </div>


                 
                
                  
            
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Actualizar
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


