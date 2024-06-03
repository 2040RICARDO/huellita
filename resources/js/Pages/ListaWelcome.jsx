import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, Head,useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import {ArrowRightCircle,ArrowRight,ArrowLeft} from 'react-feather'



import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function ListWelcome({ auth, laravelVersion, phpVersion,campanas,mascotas,extravios,tipo }) {


    const [selectedCampana, setSelectedCampana] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [tituloModal,setTitleModal]  =useState('');

    const openModal = (campana,tipo) => {
        if(tipo == 'campana'){
            setTitleModal('CAMPAÑA');
        }else if(tipo == 'mascota'){
            setTitleModal('MASCOTA')
        }else if(tipo == 'extravio'){
            setTitleModal('EXTRAVIO')
        }
        setSelectedCampana(campana);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    



    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellidos: '',
        ci: '',
        direccion: '',
        celular: '',
        descripcion: '',
        estado:0,
    
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('adopcion_p'));
    };

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classNameNameList.add('!hidden');
        document.getElementById('docs-card')?.classNameNameList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classNameNameList.add('!flex-row');
        document.getElementById('background')?.classNameNameList.add('!hidden');
    };

    return (
        <>
    <section className="bg-white mb-20  ">

        <div className="container max-w-screen-xl mx-auto px-4">

            <nav className="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

                <div className="flex items-center justify-between mb-10 lg:mb-0">
                    <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center text-green-700 border border-green-700 rounded-md mr-4">
                    <ArrowLeft size={15}/>
                    </button>



                    <img src="/assets/image/logoSOS.png" alt="Logo img" className="w-52 md:w-80 lg:w-full"/>

                    <button className="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-green-700 border border-green-700 rounded-md" >
                        <i data-feather="menu"></i>
                    </button>
                </div>

            </nav>


        </div> 

    </section>

    <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">
        {
            tipo == 'campana'?'CAMPAÑAS':(tipo == 'mascota'?'MASCOTAS':(tipo == 'extravio'?'EXTRAVIOS':''))
        }
         <br/>
         </h1>
    <section className='mr-20 ml-48'>
        <section class="text-gray-600 body-font">
            
            <div class="container px-5 py-24 mx-auto">


                {
                    campanas &&(
                        campanas.map((campana)=>(
                            <div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                                <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">


                                {
                                    campana.imagen_campana != null ?
                                    ( <img
                                        src={`/img_campana/${campana.imagen_campana}`}
                                        alt="Imagen Campaña"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                                    />):(<img
                                        src={`/img_campana/avatar.jpg`}
                                        alt="Imagen Campaña"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                                    />)
                                }

                                </div>
                                <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                    <h1 class="text-black text-2xl title-font font-bold mb-2">{campana.nombre}</h1>
                                    <p class="leading-relaxed text-base">{campana.descripcion}</p>
                                    <br />
                                    <div class="md:flex font-bold text-gray-800">
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">CELULAR</h2>
                                                <p >{campana.celular}</p>
                                            </div>
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">DIRECCION</h2>
                                                <p>{campana.direccion}</p>
                                            </div>
                                        </div>
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">UBICACION</h2>
                                                <p>{campana.ubicacion}</p>
                                            </div>
                        
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div class="md:flex font-bold text-gray-800">
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">FECHA</h2>
                                                <p >DE {campana.fecha_inicio} A {campana.fecha_final}</p>
                                            </div>
                             
                                        </div>
                                    </div>
                                    <button onClick={() => openModal(campana,'campana')} class="mt-3 text-indigo-500 inline-flex items-center">Ver Detalle
                                        <ArrowRight size={15}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }

                {
                    mascotas &&(
                        mascotas.map((mascota)=>(
                            <div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                                <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
                                    {
                                        mascota.imagen_mascota != null ?
                                        ( <img
                                            src={`/img_mascota/${mascota.imagen_mascota}`}
                                            alt="Imagen Mascota"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                                        />):(<img
                                            src={`/img_mascota/avatar.png`}
                                            alt="Imagen Mascota"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                                        />)
                                    }
                                </div>
                                <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                    <h1 class="text-black text-2xl title-font font-bold mb-2">{mascota.nombre}</h1>
                                    <p class="leading-relaxed text-base">{mascota.descripcion}</p>
                                    
                                    <div class="md:flex font-bold text-gray-800">
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">TIPO /ESPECIE</h2>
                                                <p >{mascota.tipo}</p>
                                            </div>
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">GENERO</h2>
                                                <p>{mascota.genero}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br /> <br />
                                    <div class="md:flex font-bold text-gray-800">
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">RAZA</h2>
                                                <p >{mascota.raza}</p>
                                            </div>
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">COLOR</h2>
                                                <p>{mascota.color}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => openModal(mascota,'mascota')} class="mt-3 text-indigo-500 inline-flex items-center">Ver Detalle
                                        <ArrowRight size={15}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }

                {
                    extravios &&(
                        extravios.map((extravio)=>(
                            <div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
                                <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
                                {extravio.imagen_extravio != null?
                                    (
                                        <img
                                            src={`/img_extravio/${extravio.imagen_extravio}`}
                                            alt="image"
                                            className="h-full w-full object-cover "
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    ):(
                                        <img
                                            src='/img_extravio/avatar.png'
                                            alt="image"
                                            className="h-full w-full object-cover"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                    <h1 class="text-black text-2xl title-font font-bold mb-2">{extravio.nombre} {extravio.apellidos}</h1>
                                    <p class="leading-relaxed text-base">{extravio.descripcion}</p>
                                    
                                    <div class="md:flex font-bold text-gray-800">
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">FECHA EXTRAVIO</h2>
                                                <p >{extravio.fecha_extravio}</p>
                                            </div>
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">CELULAR</h2>
                                                <p>{extravio.celular}</p>
                                            </div>
                                        </div>
                                        <div class="w-full md:w-1/2 flex space-x-3">
                                            <div class="w-1/2">
                                                <h2 class="text-gray-500">DIRECCION</h2>
                                                <p>{extravio.direccion}</p>
                                            </div>
                               
                                        </div>
                                    </div>
                                    <button onClick={() => openModal(extravio,'extravio')} class="mt-3 text-indigo-500 inline-flex items-center">Ver Detalle
                                        <ArrowRight size={15}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }
                
            
            </div>
        </section>
        
    </section>
    






<footer className="bg-white py-10 md:py-16">

<div className="container max-w-screen-xl mx-auto px-4">

    <div className="flex flex-col lg:flex-row justify-between">
        <div className="text-center lg:text-left mb-10 lg:mb-0">
            <div className="flex justify-center lg:justify-start mb-5">
                <img src="/assets/image/logoSOS.png" alt="Image"/>
            </div>

            <p className="font-light text-gray-400 text-xl mb-10">Organizacion <br/> SOS Llallagua</p>

         
        </div>

        <div className="text-center lg:text-left mb-10 lg:mb-0">
            <h4 className="font-semibold text-gray-900 text-2xl mb-6">Redes</h4>

            <a href="https://www.facebook.com/animalessosllallagua" target='_blank' className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">Facebook</a>

        </div>

        <div className="text-center lg:text-left mb-10 lg:mb-0">
            <h4 className="font-semibold text-gray-900 text-2xl mb-6">Contactos</h4>

            <a href="#" className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">72454873</a>

            <a href="#" className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">karen_msg@yahoo.es</a>
            
            <a href="https://animalessos.org/?fbclid=IwAR2chYBWaiWYp8cZehqaAwBLqnKCTfkulTOmHrOOrjmcukCH5E4g0zDY2-Y_aem_AcUacPzcO-MysmKnXi_USpIjQJLnv2vm6HjOTwhQEtQxal4YAnWAwdCbX1h_F20zj81GPBkGugqr_kJC4q7aKC4b" target='_blank' className="block font-light text-gray-400 text-xl mb-6 hover:text-gray-800 transition ease-in-out duration-300">
            animalessos.org</a>
        </div>

    </div>

</div> 

</footer>
<Modal show={showModal} closeModal={closeModal}>

            {selectedCampana && (
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

                        <div class="relative mx-auto w-full max-w-sm pt-6">
                      
                            <div class="rounded-lg">
                            <div class="relative flex h-60 justify-center overflow-hidden rounded-lg">
                                <div class="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                                {
                                    
                                    
                                    (tituloModal == 'CAMPAÑA')?
                                    (
                                        selectedCampana.imagen_campana != null?
                                        (
                                            <img
                                                src={`/img_campana/${selectedCampana.imagen_campana}`}
                                                alt="image"
                                                className="h-full w-full object-cover "
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                        :
                                        (
                                            <img
                                                src='/img_campana/avatar.jpg'
                                                alt="image"
                                                className="h-full w-full object-cover"
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                        
                                    )
                                    :(tituloModal == 'MASCOTA')?
                                    (
                                        selectedCampana.imagen_mascota != null?
                                        (
                                            <img
                                                src={`/img_mascota/${selectedCampana.imagen_mascota}`}
                                                alt="image"
                                                className="h-full w-full object-cover "
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                        :
                                        (
                                            <img
                                                src='/img_campana/avatar.jpg'
                                                alt="image"
                                                className="h-full w-full object-cover"
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                        
                                    )
                                    :(tituloModal == 'EXTRAVIO')?
                                    (
                                        selectedCampana.imagen_extravio != null?
                                        (
                                            <img
                                                src={`/img_extravio/${selectedCampana.imagen_extravio}`}
                                                alt="image"
                                                className="h-full w-full object-cover "
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                        :
                                        (
                                            <img
                                                src='/img_campana/avatar.jpg'
                                                alt="image"
                                                className="h-full w-full object-cover"
                                                style={{width:'300px',height:'300px'}}
                                            />
                                        )
                                    )
                                    :''
                                }


                                </div>


                                <span class="absolute left-0 top-0 z-10 ml-3 mt-3 inline-flex select-none rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white"> {tituloModal} </span>
                            </div>

                            <div class="">
                                <div class="mt-4 grid grid-cols-2">
                                <div class="flex items-center">
                                    <div class="relative">
                                    <h2 class="line-clamp-1 text-base font-medium text-gray-800 md:text-lg" title="New York">
                                        {
                                            selectedCampana.nombre?selectedCampana.nombre:''
                                        }
                                        {
                                            ` ${selectedCampana.apellidos?selectedCampana.apellidos:''}`
                                        }

                                    </h2>
                                    {
                                        (selectedCampana.fecha_extravio != null || selectedCampana.fecha_final ||
                                        selectedCampana.fecha_inicio)&&(
                                            <p class="mt-2 line-clamp-1 text-sm text-gray-800" title="New York, NY 10004, United States">
                                       
                                            {
                                               selectedCampana.fecha_extravio ?`Fecha Extravio: ${selectedCampana.fecha_extravio}` : (selectedCampana.fecha_inicio ?`DE ${selectedCampana.fecha_inicio} A ${selectedCampana.fecha_final}`:'')
                                            }
                                            </p>
                                        )
                                    }
                                   
                                    </div>
                                </div>
                              {
                                selectedCampana.tipo && (
                                    <div class="flex items-center justify-end">
                                        <p class="text-primary inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                                        <span class="text-sm uppercase"> {selectedCampana.tipo}</span>
                                        </p>
                                    </div>
                                )
                              }
                                    
                                </div>
                                {
                                    selectedCampana.descripcion&&(
                                        <div class="mb-5 mt-2 border-t border-gray-200 pt-3">
                                            {selectedCampana.descripcion}
                                        </div>
                                    )
                                }
                                <hr className='mb-4'/>
                                {
                                    selectedCampana.celular&&(
                                        <div class=" grid  border-gray-200 mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Celular : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.celular}</span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }

                                {
                                    selectedCampana.direccion&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Direccion : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.direccion} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.ubicacion&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Ubicacion : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.ubicacion} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }

                                {
                                    selectedCampana.edad&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Edad : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.edad} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.genero&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Genero : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.genero} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.raza&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Raza : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.raza} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                
                                {
                                    selectedCampana.color&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Color : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.color} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.refugio&&(
                                        <div class=" grid  border-gray-200  mb-3">
                                            <p class="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Refugio : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.refugio} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                            </div>
                        <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg mb-10" onClick={closeModal}>Cerrar</button>
                        </div>
                 
                        
                    </div> 
                )}

            </Modal>

        </>
    );
}
