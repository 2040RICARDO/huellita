import React, { useEffect, useRef, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PlusCircle,MoreVertical,Download,Search,Edit2,Trash,ArrowLeft,ArrowRight,Eye,CornerDownRight,Archive} from 'react-feather'
import { router,Link,useForm} from '@inertiajs/react';
import Swal from 'sweetalert2';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';



export default function IndexMascota ({auth,adopciones}) {

    const { data, setData, post, processing, errors } = useForm({
        estado: 4,
    });


    const [contador, setContador] = useState(1);

    const [showMenus, setShowMenus] = useState({});
   
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowMenus({});
        }
    };

    const handleToggleMenu = (adopcionId) => {
        setShowMenus((prevMenus) => ({
            ...prevMenus,
            [adopcionId]: !prevMenus[adopcionId],
        }));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const HandleDelete = (e,id) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar la adopcion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('adopcion.destroy',id));
            }
        });
    };

    ////////////////busqueda
    const [searchQuery, setSearchQuery] = useState('');
    const searchAdopcion = () => {
        return adopciones.filter((adopcion) => {
            return (
                adopcion.nombre_adoptante.toLowerCase().includes(searchQuery.toLowerCase()) 
            );
        });
    };

    const filteredAdopciones = searchAdopcion();
     ////////////////busqueda

     ////////////paginacion
    const [pageNumber, setPageNumber] = useState(0);
    const adopcionesPerPage = 30; 
    const pagesVisited = pageNumber * adopcionesPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const pageCount = Math.ceil(adopciones.length / adopcionesPerPage);
    ///////////paginacion
    


    const [selectedAdopcion, setSelectedAdopcion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openModal = (adopcion) => {
        setSelectedAdopcion(adopcion);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    ////////////REPORTE
    const [showModal_r, setShowModal_r] = useState(false);
    
    const openModal_r = () => {
        setShowModal_r(true);
    };

    const closeModal_r = () => {
        setShowModal_r(false);
    };

    const handleReporte = () => {
        const estado = data.estado;
        window.open( `/adopcion_r/reporte/${estado}`, '_blank');
    };

    const handleReporteForm = (id) => {

        window.open( `/adopcion_rd/reporte/${id}`, '_blank');
    };
    /////REPORTE

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adopciones</h2>}
        >

        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
        

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{adopciones.length} Adopciones</span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Se tiene registrado en Total {adopciones.length} Adopciones</p>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                    <button onClick={() => openModal_r()}className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200" target="_blank" >
                        <Download size={15} />
                        <span>Reporte</span>
                    </button>

                    <Link href={route('adopcion.create')}  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <PlusCircle size={15}/>
                        <span>Nueva Adopcion</span>
                    </Link>
              
                </div>
          
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <Search size={20} className='w-5 h-5 mx-3 text-gray-400 dark:text-gray-600'></Search>
                    </span>
                    
                    <input type="text" placeholder="Buscar" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-200">
                                    <tr>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            <span>N°</span>
                                        </th>
                                
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            <span>ADOPTANTE </span>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            CELULAR
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right ">
                                            FECHA ADOPCION
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            ESTADO
                                        </th>
                                        <th scope="col" className="relative py-3.5 px-4">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                  {
                                    filteredAdopciones.slice(pagesVisited, pagesVisited + adopcionesPerPage).map((adoptante,index)=>(
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 te ">{contador+index}</h2>
                                                </div>
                                            </td>
                                
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 te ">{adoptante.nombre_adoptante} {adoptante.apellidos_adoptante}</h2>
                                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400"  >{adoptante.ci_adoptante}</p>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <h4 className="text-gray-700 ">{adoptante.celular_adoptante}</h4> 
                                            </td>
                                            
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <h4 className="text-gray-700 ">{adoptante.fecha}</h4> 
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${adoptante.estado_adopcion == 0?'text-black-500 bg-blue-100/60':(adoptante.estado_adopcion == 1)?'text-black-500 bg-green-500/60':(adoptante.estado_adopcion == 2)?'text-black-500 bg-red-500/60':'text-black-500 bg-pink-100/60'}`}>
                                                    <h2 className="text-sm font-normal">{adoptante.estado_adopcion == 0?'PENDIENTE':(adoptante.estado_adopcion == 1)?'ADOPTADO':(adoptante.estado_adopcion == 2)?'RECHAZADO':''}</h2>
                                                </div>
                                            </td>


                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <button
                                                        onClick={() => handleToggleMenu(adoptante.id)}
                                                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
                                                    >
                                                        <MoreVertical size={17} style={{color:'black'}}/>
                                                    </button>
                                                    {showMenus[adoptante.id] && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg" ref={dropdownRef}>
                                                            <ul className="py-1">
                                                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                                                    <Link
                                                                        href={route('adopcion.edit',adoptante.id)}
                                                                        data-tooltip-id="showCliente"
                                                                        data-tooltip-content="VER"
                                                                        className="hover:text-green-900 mr-2 flex items-center"
                                                                    >
                                                                        <Edit2 size={13} className="mr-1" /> Editar Datos
                                                                    </Link>
                                                                </li>
                                                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                                                    <button
                                                                        onClick={() => openModal(adoptante)}
                                                                            data-tooltip-id="showCliente"
                                                                            data-tooltip-content="VER"
                                                                            className="hover:text-green-900 mr-2 flex items-center"
                                                                        >
                                                                        <Eye size={13} className="mr-1" /> Ver detalle
                                                                    </button>
                                                                </li>
                                                                {
                                                                    adoptante.estado_adopcion == 1&&(
                                                                        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                                                            <Link
                                                                               onClick={(e) => { e.preventDefault(); handleReporteForm(adoptante.id); }}
                                                                                data-tooltip-id="showCliente"
                                                                                data-tooltip-content="VER"
                                                                                className="hover:text-green-900 mr-2 flex items-center"
                                                                            >
                                                                                <Archive size={13} className="mr-1" /> Imprimir Form. Adopcion
                                                                            </Link>
                                                                        </li> 
                                                                    )
                                                                }

                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                  } 
                                </tbody>
                            </table>
                          
                        </div>
                    </div>
                </div>
            </div>
            <br/><br />
            <div className="mt-6 sm:flex sm:items-center sm:justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Pagina <span className="font-medium">{pageNumber + 1} de {pageCount}</span>
                </div>

                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <a
                        href="#"
                        onClick={() => changePage({ selected: pageNumber - 1 })}
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${pageNumber === 0 && 'pointer-events-none opacity-50'}`}
                    >
                        <ArrowLeft size={15}/>
                        <span>Anterior</span>
                    </a>
                    
                    <a
                        href="#"
                        onClick={() => changePage({ selected: pageNumber + 1 })}
                        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${pageNumber === pageCount - 1 && 'pointer-events-none opacity-50'}`}
                    >
                        <span>Siguiente</span>
                        <ArrowRight size={15}/>
                    </a>
                </div>
            </div>
            <Modal show={showModal} closeModal={closeModal}>
            {selectedAdopcion && (
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">

                            {selectedAdopcion.imagen_mascota != null?
                            (
                                <img
                                    src={`/img_mascota/${selectedAdopcion.imagen_mascota}`}
                                    alt="image"
                                    className="h-full w-full object-cover "
                                    style={{width:'320px',height:'320px'}}
                                />
                            ):(
                                <img
                                    src='/img_mascota/avatar.png'
                                    alt="image"
                                    className="h-full w-full object-cover"
                                    style={{width:'320px',height:'320px'}}
                                />
                            )}
                            <div className="flex flex-row text-sm">
                                <p className="flex items-center  text-gray-500 ml-3 text-center">
                                    <span >{selectedAdopcion.descripcion != null?selectedAdopcion.descripcion:''}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4  p-6 text-gray-600">
                        <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">Nombre:</span>
                                    <span>{selectedAdopcion.nombre_adoptante != null? `${selectedAdopcion.nombre_adoptante} ${selectedAdopcion.apellidos_adoptante}` :'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">ci:</span>
                                    <span>{selectedAdopcion.ci_adoptante != null?selectedAdopcion.ci_adoptante:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">direccion:</span>
                                    <span>{selectedAdopcion.direccion_adoptante != null?selectedAdopcion.direccion_adoptante:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">celular:</span>
                                    <span>{selectedAdopcion.celular_adoptante != null?selectedAdopcion.celular_adoptante:'N/N'}</span>
                                </p>
                            </div>

                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">Fecha Adopcion:</span>
                                    <span>{selectedAdopcion.fecha != null?selectedAdopcion.fecha:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">GESTION:</span>
                                    <span>{selectedAdopcion.gestion != null?selectedAdopcion.gestion:'N/N'}</span>
                                </p>
                            </div>

                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">Estado Adopcion:</span>
                                    <span className={`${selectedAdopcion.estado_adopcion == 0?'text-black-500 bg-blue-100/60':(selectedAdopcion.estado_adopcion == 1)?'text-black-500 bg-green-500/60':(selectedAdopcion.estado_adopcion == 2)?'text-black-500 bg-red-500/60':'text-black-500 bg-pink-100/60'}`}>{selectedAdopcion.estado_adopcion == 0?'PENDIENTE':(selectedAdopcion.estado_adopcion == 1)?'ADOPTADO':(selectedAdopcion.estado_adopcion == 2)?'RECHAZADO':''}</span>
                                </p>
                            </div>

                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">mascota:</span>
                                    <span>{selectedAdopcion.nombre_mascota != null?selectedAdopcion.nombre_mascota:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">edad:</span>
                                    <span>{selectedAdopcion.edad != null?selectedAdopcion.edad:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">genero:</span>
                                    <span>{selectedAdopcion.genero != null?selectedAdopcion.genero:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">raza:</span>
                                    <span>{selectedAdopcion.raza != null?selectedAdopcion.raza:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">color:</span>
                                    <span>{selectedAdopcion.color != null?selectedAdopcion.color:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">TIPO / ESPECIE:</span>
                                    <span>{selectedAdopcion.tipo_animal != null?selectedAdopcion.tipo_animal:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">refugio:</span>
                                    <span>{selectedAdopcion.refugio != null?selectedAdopcion.refugio:'N/N'}</span>
                                </p>
                            </div>
                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">Estado mascota:</span>
                                    <span className={`${selectedAdopcion.estado_vida ==true?'text-green-600':'text-red-600'} `}>{selectedAdopcion.estado_vida ==true?'VIVO':'MUERTO'}</span>
                                </p>
                            </div>

                            <div className="flex flex-row text-sm">
                            <CornerDownRight size={15} className='mr-1'/>
                                <p className="flex items-center  text-gray-500">
                                    <span className="font-semibold mr-2 text-xs uppercase">Descripcion mascota:</span>
                                    <span>{selectedAdopcion.descripcion_mascota != null?selectedAdopcion.descripcion_mascota:'N/N'}</span>
                                </p>
                            </div>

                            
                            
                    
                            <button
                            type="button"
                            className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={closeModal}
                            >
                            Cerrar
                            </button>
                        </div>
                        
                    </div>
                    )}

            </Modal>

            <Modal show={showModal_r} closeModal={closeModal_r}>
            
            <div  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-20 mr-20">
                <div className="sm:flex sm:items-start">
                 
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            REPORTE ADOPCION
                        </h3>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleReporte}  className="mt-6 space-y-6">
                        <div>          
                            <div className="-mx-3 md:flex mb-2">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                        estado
                                    </label>
                                    <select
                                        id="estado"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value)}
                                        required
                                    >
                                      
                                        <option key="4" value={4}>GENERAL</option>
                                        <option key="1" value={1}>ADOPTADO</option>
                                        <option key="0" value={0}>PENDIENTE</option>
                                        <option key="2" value={2}>RECHAZADO</option>
                                        

                                    </select>
                    
                                </div>
                            
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-4">
                            <PrimaryButton  className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                                Reporte
                            </PrimaryButton>
                            <Link onClick={closeModal_r} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                                Cerrar
                            </Link>
                    
                        </div> 
                    </form>
                </div>
                
            </div>

            
        </Modal>

          
        </section>

        </AuthenticatedLayout>
  )
}
