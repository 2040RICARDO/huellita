
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function EditCampana({auth,campana,refugios}){

    const [dateRange, setDateRange] = useState([null, null]);
    const [formattedDateRange, setFormattedDateRange] = useState('');


    const { data, setData, post, processing, errors } = useForm({
        nombre: campana.nombre,
        celular: campana.celular,
        direccion: campana.direccion,
        ubicacion: campana.ubicacion,
        fechaRango: `${campana.fecha_inicio} / ${campana.fecha_final}`,
        descripcion: campana.descripcion,
        estado:campana.estado,
        fotografia: campana.imagen_campana!= null?campana.imagen_campana:null,
        refugioId: refugios.length != 0 ?refugios[0].id:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('campana_a.actualizar', { id: campana.id }));
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
    useEffect(() => {
        if(campana.imagen_campana != null){
            setPreviewImage(`/img_campana/${campana.imagen_campana}`)
        }
        if(campana.fecha_final != null && campana.fecha_final != null){
            setFormattedDateRange(`${campana.fecha_inicio} / ${campana.fecha_final}`);
        }
    }, [])
    


    

    const handleDateChange = (update) => {
        const formattedStartDate = update[0] ? format(update[0], 'yyyy-MM-dd') : '';
        const formattedEndDate = update[1] ? format(update[1], 'yyyy-MM-dd') : '';
        const formattedRange = `${formattedStartDate} / ${formattedEndDate}`;
        
        setDateRange(update);
        setFormattedDateRange(formattedRange);
        setData('fechaRango', formattedRange);
    };
  return (
    
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Campaña</h2>}
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
                                celular
                            </label>
                            <TextInput
                                id="celular"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
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
                        
                    </div>
                    <div className="-mx-3 md:flex mb-8">
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                direccion
                            </label>
                            <TextInput
                                id="color"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                value={data.direccion}
                                onChange={(e) => setData('direccion', e.target.value)}
                                required
                                autoComplete="direccion"
                            />
                            <InputError className="text-red text-xs italic" message={errors.direccion} />
                        </div>
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                ubicacion
                            </label>
                            <TextInput
                                id="edad"
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                value={data.ubicacion}
                                onChange={(e) => setData('ubicacion', e.target.value.toUpperCase())}
                                required
                                autoComplete="ubicacion"
                            />
                            <InputError className="text-red text-xs italic" message={errors.ubicacion} />


                        </div>
                        
                    </div>



                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3 mb-8 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="startDate">
                                Fecha de inicio y final de la campaña
                            </label>
                            <DatePicker
                                selectsRange={true}
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-8 mb-3"
                                startDate={dateRange[0]}
                                endDate={dateRange[1]}
                                onChange={handleDateChange}
                                isClearable={true}
                                startDatePlaceholderText="Fecha de inicio"
                                endDatePlaceholderText="Fecha final"
                                value={formattedDateRange}
                            />                
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="refugioId">
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
                                Imagen campaÑA
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

                    <div className="-mx-3 md:flex mb-6">
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                ESTADO CAMPAÑA
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center rounded-lg border border-gray-300 p-2 hover:border-blue-500 transition-all duration-300 mr-16" >
                                    <input
                                        type="radio"
                                        className="appearance-none border-none w-5 h-5 checked:bg-blue-500 checked:border-transparent checked:text-white"
                                        name="estado"
                                        value="1"
                                        checked={data.estado === 1}
                                        onChange={(e) => setData('estado', 1)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">VIGENTE</span>
                                </label>
                                <label className="inline-flex items-center rounded-lg border border-gray-300 p-2 hover:border-blue-500 transition-all duration-300">
                                    <input
                                        type="radio"
                                        className="appearance-none border-none w-5 h-5 checked:bg-blue-500 checked:border-transparent checked:text-white"
                                        name="estado"
                                        value="0"
                                        checked={data.estado === 0}
                                        onChange={(e) => setData('estado', 0)}
                                    />
                                    <span className="ml-2 text-sm font-semibold">VENCIDO</span>
                                </label>
                            </div>
                            <InputError className="text-red text-xs italic" message={errors.genero} />
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


