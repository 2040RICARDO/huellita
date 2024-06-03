import React, { useEffect, useRef, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PlusCircle,MoreVertical,Download,Search,Edit2,Trash,ArrowLeft,ArrowRight} from 'react-feather'
import { router,Link } from '@inertiajs/react';
import Swal from 'sweetalert2';


export default function IndexRefugio ({auth,animales}) {

    const [contador, setContador] = useState(1);

    const [showMenus, setShowMenus] = useState({});
   
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowMenus({});
        }
    };

    const handleToggleMenu = (animalId) => {
        setShowMenus((prevMenus) => ({
            ...prevMenus,
            [animalId]: !prevMenus[animalId],
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
            title: '¿Estás seguro de que quieres eliminar el tipo animal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
          
                router.delete(route('tipo_animal.destroy',id));
            }
        });
    };

    ////////////////busqueda
    const [searchQuery, setSearchQuery] = useState('');
    const searchRefugios = () => {
        return animales.filter((animal) => {
            return (
                animal.tipo.toLowerCase().includes(searchQuery.toLowerCase()) 
            );
        });
    };

    const filteredAnimales = searchRefugios();
     ////////////////busqueda

     ////////////paginacion
    const [pageNumber, setPageNumber] = useState(0);
    const animalesPerPage = 30; 
    const pagesVisited = pageNumber * animalesPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const pageCount = Math.ceil(animales.length / animalesPerPage);
    ///////////paginacion
    

    const handleReporte = () => {
 

        window.open('/refugio_r/reporte', '_blank');
    };


  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tipo Animal</h2>}
        >

        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                       

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{animales.length} animales</span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Se tiene registrado en Total {animales.length} animales</p>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                    <button onClick={()=>handleReporte()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200" target="_blank" >
                        <Download size={15} />
                        <span>Reporte</span>
                    </button>

                    <Link href={route('tipoAnimal.create')}  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <PlusCircle size={15}/>
                        <span>Nuevo Tipo de Animal</span>
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
                                            <span>TIPO DE ANIMAL</span>
                                        </th>
                                        
                                        <th scope="col" className="relative py-3.5 px-4">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                  {
                                    filteredAnimales.slice(pagesVisited, pagesVisited + animalesPerPage).map((animal,index)=>(
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 te ">{contador+index}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 te ">{animal.tipo}</h2>
                                                </div>
                                            </td>
                                       

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <button
                                                        onClick={() => handleToggleMenu(animal.id)}
                                                        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
                                                    >
                                                        <MoreVertical size={17} style={{color:'black'}}/>
                                                    </button>
                                                    {showMenus[animal.id] && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg" ref={dropdownRef}>
                                                            <ul className="py-1">
                                                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                                                    <Link
                                                                        href={route('tipoAnimal.edit',animal.id)}
                                                                        data-tooltip-id="showAnimal"
                                                                        data-tooltip-content="VER"
                                                                        className="hover:text-green-900 mr-2 flex items-center"
                                                                    >
                                                                        <Edit2 size={13} className="mr-1" /> Editar Datos
                                                                    </Link>
                                                                </li>
                                                                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                                                    <button
                                                                       onClick={(e) => HandleDelete(e,animal.id)}
                                                                        data-tooltip-id="showAnimal"
                                                                        data-tooltip-content="VER"
                                                                        className="hover:text-green-900 mr-2 flex items-center"
                                                                    >
                                                                        <Trash size={13} className="mr-1" /> Eliminar
                                                                    </button>
                                                                </li>
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

          
        </section>

        </AuthenticatedLayout>
  )
}
