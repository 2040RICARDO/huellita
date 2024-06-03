import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, Head,useForm,usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import {ArrowRightCircle} from 'react-feather'



import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

export default function Welcome({ auth, laravelVersion, phpVersion,campanas,mascotas,extravios}) {


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
  

    const Reset = () => {
        setData({
            nombre: '',
            apellidos: '',
            ci: '',
            direccion: '',
            celular: '',
            descripcion: '',
            estado: 0,
        });
    };

   

    const submit = async (e) => {
        e.preventDefault();
        post(route('adopcion_p'));
        Reset()

    };
  
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classNameNameList.add('!hidden');
        document.getElementById('docs-card')?.classNameNameList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classNameNameList.add('!flex-row');
        document.getElementById('background')?.classNameNameList.add('!hidden');
    };

    return (
        <>
        
    <section className="bg-white mb-20 md:mb-52 xl:mb-72">

       
  
        <div className="container max-w-screen-xl mx-auto px-4">

            <nav className="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

                <div className="flex items-center justify-between mb-10 lg:mb-0">
                    <img src="/assets/image/logoSOS.png" alt="Logo img" className="w-52 md:w-80 lg:w-full"/>

                    <button className="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-green-700 border border-green-700 rounded-md" >
                        <i data-feather="menu"></i>
                    </button>
                </div>

                <ul className="lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16" >

                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink to="informacion" smooth={true} duration={500}>Informacion</ScrollLink>
                    </li>
                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink to="campana" smooth={true} duration={500}>Campaña</ScrollLink>
                    </li>
                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink to="mascota" smooth={true} duration={500}>Mascota</ScrollLink>
                    </li>

                    <li className="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                        <ScrollLink to="extravio" smooth={true} duration={500}>Extravio</ScrollLink>
                    </li>


                </ul>

                {
                    auth.user? 
                    (
                    <Link
                    href={route('dashboard')}
                    className="px-5 py-3 lg:block border-2 border-green-700 rounded-lg font-semibold text-green-700 text-xs hover:bg-green-700 hover:text-white transition ease-linear duration-500 mr-4"
                    >
                        Principal
                    </Link>

                    ):(
                        <>
                            <Link
                                href={route('login')}
                                className="px-5 py-3 lg:block border-2 border-green-700 rounded-lg font-semibold text-green-700 text-xs hover:bg-green-700 hover:text-white transition ease-linear duration-500 mr-4"
                            >
                                Ingresar
                            </Link>

                            <Link
                                href={route('register')}
                                className="px-5 py-3 lg:block border-2 border-green-700 rounded-lg font-semibold text-green-700 text-xs hover:bg-green-700 hover:text-white transition ease-linear duration-500"
                            >
                                Registro
                            </Link>
                        
                        </>

                    )
                }

            

            </nav>

            <div className="flex items-center justify-center xl:justify-start">

                <div className="mt-28 text-center xl:text-left">
                    <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">Organizacion <br/> SOS Llallagua</h1>

                    <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">Sistema web registro y control  <br/> de adopcion de Mascotas</p>
                    <button className="px-6 py-4 bg-green-700 text-white font-semibold text-lg rounded-xl hover:bg-green-900 transition ease-in-out duration-500"><ScrollLink to="formulario" smooth={true} duration={500}>Adopta</ScrollLink></button>
                
                </div>

                <div className="hidden xl:block xl:absolute z-0 top-0 right-0">
                    <img src="/assets/image/1.png" alt="Home img"  />
                </div>

            </div>

        </div> 

    </section>



<section className="bg-white py-10 md:py-16" id='informacion'>

    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">



        <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">Informacion sobre<br/> SOS Llallagua</h1>

        <div className="hidden xl:block xl:absolute top-0">
            <img src="/assets/image/4.png" alt="Image"/>
        </div>

        <div className="hidden xl:block xl:absolute top-32">
            <img src="/assets/image/3.png" alt="Image"/>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-center md:space-x-8 lg:space-x-12 mb-10 md:mb-20">

            <div className="bg-gray-100 rounded-lg mb-10 md:mb-0">
                <img src="/assets/image/2.png" alt="Image" className="mx-8 my-8"/>
                <div className="flex items-center gap-5 mx-8">
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                </div>

                <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">Animales S.O.S. está legalmente establecida en Bolivia con Personería Jurídica R.P. N°831/96. “Animales S.O.S.” Filial Llallagua, es una organización de Bienestar Animal sin fines de lucro, que funciona con VOLUNTARIOS desde enero de 2014, somos una filial de Animales SOS Bolivia, su campo de acción es la ciudad de Llallagua, tercera sección de la Provincia Bustillo del Departamento de Potosí.</p>

                <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Quienes Somos</h3>
            </div>

            <div className="bg-gray-100 rounded-lg">
                <img src="/assets/image/2.png" alt="Image" className="mx-8 my-8"/>

                <div className="flex items-center gap-5 mx-8">
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                    <i data-feather="star" className="text-yellow-500"></i>
                </div>

                <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">El bienestar animal El derecho a los animales a una vida digna o cuando sea imprescindible una muerte sin sufrimiento. La defensa de las especies silvestres como parte de la biodiversidad del planeta y el respeto a su entorno natural. La propuesta y aprobación de leyes y ordenanzas de protección animal. El cumplimiento de las disposiciones legales que amparan a los animales.</p>

                <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Que promovemos?</h3>
            </div>

        </div>

    </div> 

</section>

<section id="campana" className="bg-white py-10 md:py-16">

    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

        <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">Campañas<br/> SOS Llallagua</h1>
        <div className="container max-w-screen-xl mx-auto px-4">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">



            {
                campanas.map((campana,index)=>(

                    <div className="px-6 py-6 w-full border-2 border-gray-200 rounded-3xl">
                        {
                            campana.imagen_campana != null ?
                            ( <img
                                src={`/img_campana/${campana.imagen_campana}`}
                                alt="Imagen Campaña"
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                                className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                            />):(<img
                                src={`/img_campana/avatar.jpg`}
                                alt="Imagen Campaña"
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                                className="mb-6 hover:opacity-75 transition ease-in-out duration-500"
                            />)
                        }


                   
                        <h4 className="font-semibold text-gray-900 text-lg md:text-2xl mb-6">{campana.nombre}</h4>
        
                        <p className="font-light text-gray-400 text-sm md:text-md lg:text-lg mb-10">{campana.descripcion}</p>
        
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">De : <span className="font-semibold text-gray-900 text-md md:text-lg">{campana.fecha_inicio}</span></h6>
        
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">A : <span className="font-semibold text-gray-900 text-md md:text-lg">{campana.fecha_final}</span></h6>
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Celular : <span className="font-semibold text-gray-900 text-md md:text-lg">{campana.celular}</span></h6>
    
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Direccion : <span className="font-semibold text-gray-900 text-md md:text-lg">{campana.direccion}</span></h6>
    
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Ubicacion : <span className="font-semibold text-gray-900 text-md md:text-lg">{campana.ubicacion}</span></h6>
                        </div>
                
                        <button onClick={() => openModal(campana,'campana')} className="w-full py-4 bg-info font-semibold text-white text-lg rounded-xl bg-blue-800 ">Leer Mas</button>
                    </div>
                ))
            }
           
        </div>

        <div className="flex items-center justify-center">
            <Link href={route('welcome_ver','campana')} className="px-7 py-5 font-semibold bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-300 hover:text-gray-600 transition ease-in-out duration-500">Mas Campañas</Link>
        </div>

        </div>
        

    </div> 

</section>

<section className="py-8 md:py-16" id='mascota'>

            <div className="container max-w-screen-xl mx-auto px-4">

                <h1 className="font-semibold text-gray-700 text-3xl md:text-4xl text-center mb-5">Mascotas</h1>




                <div className="flex flex-col xl:flex-row items-center justify-between">
                    <div className="mx-auto xl:mx-0 mb-20 xl:mb-0">
                        <img src="/assets/image/5.png" alt="Image"/>
                    </div>

                    <div className="mx-auto xl:mx-0 text-center xl:text-left">
                        <h1 className="font-bold text-gray-700 text-3xl md:text-4xl mb-10">No compres  <br/>Adopta</h1>

                        {
                            mascotas.map((mascota) => (
                                <div key={mascota.id} className="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20 items-center"> {/* Usar un identificador único */}
                                    <div className="px-8 h-20 mx-auto md:mx-0 bg-gray-200 rounded-lg flex items-center justify-center mb-5 md:mb-0">
                                        {mascota.imagen_mascota != null ? (
                                            <img
                                                src={`/img_mascota/${mascota.imagen_mascota}`}
                                                alt="image"
                                                className="h-full w-full object-cover"
                                                style={{ width: '100px', height: '100px' }} // Ajustar tamaño de la imagen
                                            />
                                        ) : (
                                            <img
                                                src='/img_mascota/avatar.png'
                                                alt="image"
                                                className="h-full w-full object-cover"
                                                style={{ width: '100px', height: '100px' }} // Ajustar tamaño de la imagen
                                            />
                                        )}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-semibold text-gray-900 text-2xl mb-2">{mascota.nombre} - {mascota.tipo}</h4>
                                        <p className="font-normal text-gray-400 text-xl leading-relaxed">
                                            {mascota.descripcion.length > 40 ?
                                                `${mascota.descripcion.slice(0, 40)}...` :
                                                mascota.descripcion
                                            }
                                            <button onClick={() => openModal(mascota, 'mascota')} className="text-blue-500 hover:underline">Ver más</button>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
                <div className="flex items-center justify-center">
                    <Link href={route('welcome_ver','mascota')} className="px-7 py-5 font-semibold bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-300 hover:text-gray-600 transition ease-in-out duration-500">Mas Mascotas</Link>
                </div>

            </div> 

        </section>





<section id='extravio' className="bg-white py-10 md:py-16">

    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

        <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">Extravios<br/>Busca tu mascota</h1>
        <div className="container max-w-screen-xl mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
       
            {
                extravios.map((extravio,index)=>(

                    <div className="px-6 py-6 w-full border-2 border-gray-200 rounded-3xl">
                        {extravio.imagen_extravio != null?
                        (
                            <img
                                src={`/img_extravio/${extravio.imagen_extravio}`}
                                alt="image"
                                className="h-full w-full object-cover "
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                            />
                        ):(
                            <img
                                src='/img_extravio/avatar.png'
                                alt="image"
                                className="h-full w-full object-cover"
                                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                            />
                        )}

                   
                        <h4 className="font-semibold text-gray-900 text-lg md:text-2xl mb-6">{extravio.nombre}</h4>
        
                        <p className="font-light text-gray-400 text-sm md:text-md lg:text-lg mb-10">{extravio.descripcion}</p>
        
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Fecha : <span className="font-semibold text-gray-900 text-md md:text-lg">{extravio.fecha_extravio}</span></h6>
        
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Celular : <span className="font-semibold text-gray-900 text-md md:text-lg">{extravio.celular}</span></h6>
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Dueño : <span className="font-semibold text-gray-900 text-md md:text-lg">{extravio.nombre} {extravio.apellidos}</span></h6>
    
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h6 className="font-light text-gray-400 text-sm md:text-lg">Direccion : <span className="font-semibold text-gray-900 text-md md:text-lg">{extravio.direccion}</span></h6>
    
                        </div>
                        <button onClick={() => openModal(extravio,'extravio')} className="w-full py-4 bg-info font-semibold text-white text-lg rounded-xl bg-blue-800 ">Leer Mas</button>
                    </div>
                ))
            }
            </div>

            <div className="flex items-center justify-center">
                <Link href={route('welcome_ver','extravio')} className="px-7 py-5 font-semibold bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-300 hover:text-gray-600 transition ease-in-out duration-500">Mas Extravios</Link>
            </div>

        </div>
    </div> 
</section>






<section className="bg-white py-10 md:py-16" id='formulario'>

<div className="container max-w-screen-xl mx-auto px-4 xl:relative">

    <div className="bg-pink-800 flex flex-col lg:flex-row items-center justify-evenly py-14 rounded-3xl">

        <div className="text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="font-semibold text-white text-4sm md:text-5xl lg:text-7sm leading-normal mb-4">Formulario  <br/> Adopcion de Mascota</h1>

            <p className="font-normal text-white text-md md:text-xl">Puede Solicitar la adopcion de la mascota <br/>llenando el siguiente formulario</p>
        </div>

        <div className="hidden xl:block xl:absolute right-0">
            <img src="assets/image/book.png" alt="Image"/>
        </div>

        <div className="hidden md:block bg-white xl:relative px-6 py-3 rounded-3xl">
            <form onSubmit={submit} >
                <div className="py-3">
                    <h3 className="font-semibold text-gray-900 text-3xl">Formulario</h3>
                </div>

                <div className="py-3">
                    <TextInput
                        id="nombre"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value.toUpperCase() )}
                        required
                        placeholder="NOMBRE"
                        autoComplete="nombre"
                    />
                    <InputError className="text-red text-xs italic" message={errors.nombre}/>
                </div>

                <div className="py-3">
                    <TextInput
                        id="apellidos"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        value={data.apellidos}
                        onChange={(e) => setData('apellidos', e.target.value.toUpperCase() )}
                        required
                        placeholder="APELLIDOS"
                        autoComplete="apellidos"
                    />
                    <InputError className="text-red text-xs italic" message={errors.apellidos} />
                </div>
                <div className="py-3">
                    <TextInput
                        id="ci"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        value={data.ci}
                        onChange={(e) => setData('ci', e.target.value.toUpperCase())}
                        required
                        placeholder="CI"
                        autoComplete="ci"
                    />
                    <InputError className="text-red text-xs italic" message={errors.ci} />
                </div>
                <div className="py-3">
                    <TextInput
                        id="celular"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        value={data.celular}
                        onChange={(e) => setData('celular', e.target.value.toUpperCase())}
                        required
                        placeholder="CELULAR"
                        autoComplete="celular"
                    />
                    <InputError className="text-red text-xs italic" message={errors.celular} />
                </div>
                <div className="py-3">
                    <TextInput
                        id="direccion"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        value={data.direccion}
                        onChange={(e) => setData('direccion', e.target.value.toUpperCase())}
                        required
                        placeholder="DIRECCION"
                        autoComplete="direccion"
                    />
                    <InputError className="text-red text-xs italic" message={errors.direccion} />
                </div>
                <div className="py-3">
                    <textarea
                        id="descripcion"
                        className="appearance-none block bg-grey-lighter text-grey-darker border border-red rounded px-4 py-4 w-96 mb-3 resize-none"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        required
                        autoComplete="descripcion"
                        placeholder="DESCRIPCION"
                        rows="4" 
                    />
                    <InputError className="text-red text-xs italic" message={errors.descripcion} />
                </div>

                <div className="py-3">
                    <button className="w-full py-4 font-semibold text-lg text-white bg-pink-700 rounded-xl hover:bg-pink-900 transition ease-in-out duration-500">ENVIAR</button>
                </div>
            </form>
        </div>

    </div>

</div> 

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

                        <div className="relative mx-auto w-full max-w-sm pt-6">
                      
                            <div className="rounded-lg">
                            <div className="relative flex h-60 justify-center overflow-hidden rounded-lg">
                                <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
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


                                <span className="absolute left-0 top-0 z-10 ml-3 mt-3 inline-flex select-none rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white"> {tituloModal} </span>
                            </div>

                            <div className="">
                                <div className="mt-4 grid grid-cols-2">
                                <div className="flex items-center">
                                    <div className="relative">
                                    <h2 className="line-clamp-1 text-base font-medium text-gray-800 md:text-lg" title="New York">
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
                                            <p className="mt-2 line-clamp-1 text-sm text-gray-800" title="New York, NY 10004, United States">
                                       
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
                                    <div className="flex items-center justify-end">
                                        <p className="text-primary inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                                        <span className="text-sm uppercase"> {selectedCampana.tipo}</span>
                                        </p>
                                    </div>
                                )
                              }
                                    
                                </div>
                                {
                                    selectedCampana.descripcion&&(
                                        <div className="mb-5 mt-2 border-t border-gray-200 pt-3">
                                            {selectedCampana.descripcion}
                                        </div>
                                    )
                                }
                                <hr className='mb-4'/>
                                {
                                    selectedCampana.celular&&(
                                        <div className=" grid  border-gray-200 mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Celular : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.celular}</span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }

                                {
                                    selectedCampana.direccion&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Direccion : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.direccion} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.ubicacion&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Ubicacion : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.ubicacion} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }

                                {
                                    selectedCampana.edad&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Edad : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.edad} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.genero&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Genero : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.genero} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.raza&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Raza : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.raza} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                
                                {
                                    selectedCampana.color&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Color : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.color} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    selectedCampana.refugio&&(
                                        <div className=" grid  border-gray-200  mb-3">
                                            <p className="flex items-center text-gray-800 ">
                                                <ArrowRightCircle size={15} className='mr-2'/> 
                                                <h6 className="font-light text-gray-400 text-sm ">Refugio : <span className="font-semibold text-gray-900 text-md " >{selectedCampana.refugio} </span>
                                                </h6>
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                            </div>
                        <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg mb-10" onClick={closeModal}>Cerrar</button>
                        </div>
                 
                        
                    </div> 
                )}

            </Modal>
        </>
    );
}
