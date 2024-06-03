import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import {Home,GitHub,Gitlab,Clipboard,Award,Info,BookOpen,Mail,Bell,PlusCircle} from 'react-feather'
import '../../css/styles.css'
import '../../css/styles.css'
export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
 

    return (
        <>
        <aside
                className={`ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] ${showSidebar ? 'ml-0' : ''}`}
            >
                <div className="h-full overflow-x-hidden overflow-y-auto">
                <div className="bg-gray-50 rounded-lg shadow-md p-4">
                    <a href="#" title="home">
                        <img src="/assets/image/logoSOS.png" className="w-32" alt="tailus logo"/>
                    </a>
                </div>

                <div className="mt-8 text-center">
                    <img src="/assets/image/8.jpg" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{user.name}</h5>

                </div>

                <ul className="space-y-2 tracking-wide mt-8 ">
                    <li>
                        <Link href={route('dashboard')} aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                            </svg>
                            <span className="-mr-1 font-medium">Principal</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('refugio.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <Home size={20}/>
                            <span className="group-hover:text-gray-700">Refugio</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('tipoAnimal.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <Gitlab size={20}/>
                            <span className="group-hover:text-gray-700">Animales</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('mascota.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <GitHub size={20}/>
                            <span className="group-hover:text-gray-700">Mascotas</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('campana.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <Clipboard size={20}/>
                            <span className="group-hover:text-gray-700">Campaña</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('voluntario.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <Award size={20}/>
                            <span className="group-hover:text-gray-700">Voluntario</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('extravio.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <Info size={20}/>
                            <span className="group-hover:text-gray-700">Extravio</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('adopcion.index')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <BookOpen size={20}/>
                            <span className="group-hover:text-gray-700">Adopcion</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('user_a.create')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <PlusCircle size={20}/>
                            <span className="group-hover:text-gray-700">Nuev. Usuario</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">

                    <Link
                        href={route('logout')}
                        method="post"
                        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                        style={{width:'90px'}}
                        as="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                
                    <span className="group-hover:text-gray-700">Salir</span>
                    </Link>

            </div>
        </aside>
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                    <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">{header}</h5>
                    <button className="w-12 h-16 -mr-2 border-r lg:hidden" onClick={() => setShowSidebar(!showSidebar)}>
    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex space-x-4">
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                                        <Mail className="h-5 w-5 mr-8 text-gray-600" color="rgb(69,90,100)" />
                                        <Bell className="h-5 w-5 mr-2 text-gray-600" color="rgb(69,90,100)" />
                                        <div className="ms-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user.name}
                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Salir
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                        
                
                
                    </div>
                </div>
            </div>

            <div className="px-6 pt-6 2xl:container">
            
                    <div className="md:col-span-2 lg:col-span-1" >
                        <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                        <main>{children}</main>
                        
                        
                        </div>
                    </div>
                    
                    
            
                    </div>
        </div>
      </>
    );
}
