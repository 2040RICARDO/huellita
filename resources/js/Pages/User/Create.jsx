
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { PlusCircle } from 'react-feather';
export default function CreateRefugio({auth}){
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    const submit = (e) => {
        e.preventDefault();
        post(route('user_s.store'));
    };

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuevo Usuario</h2>}
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

                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Nombre</label>
                      <TextInput
                                  id="nombre"
                                  name="nombre"
                                  value={data.nombre}
                                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                  autoComplete="nombre"
                                  isFocused={true}
                                  onChange={(e) => setData('nombre', e.target.value)}
                                  required
                              />

                              <InputError message={errors.nombre} className="mt-2" />
              
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Apellido</label>
                      <TextInput
                                  id="apellidos"
                                  name="apellidos"
                                  value={data.apellidos}
                                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                  autoComplete="apellidos"
                                  isFocused={true}
                                  onChange={(e) => setData('apellidos', e.target.value)}
                                  required
                              />

                              <InputError message={errors.apellidos} className="mt-2" />
              
                    </div>

                    

                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Email</label>

                      <TextInput
                                  id="email"
                                  type="email"
                                  name="email"
                                  value={data.email}
                                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                  autoComplete="username"
                                  onChange={(e) => setData('email', e.target.value)}
                                  required
                              />

                              <InputError message={errors.email} className="mt-2" />
                    </div>


                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Password</label>

                      <TextInput
                                  id="password"
                                  type="password"
                                  name="password"
                                  value={data.password}
                                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                  autoComplete="new-password"
                                  onChange={(e) => setData('password', e.target.value)}
                                  required
                              />

                              <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">Confirmar Password</label>

                      <TextInput
                                  id="password_confirmation"
                                  type="password"
                                  name="password_confirmation"
                                  value={data.password_confirmation}
                                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                  autoComplete="new-password"
                                  onChange={(e) => setData('password_confirmation', e.target.value)}
                                  required
                              />

                              <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mb-3 flex flex-wrap content-center">
                

                    </div>

                    <div className="mb-3">
                  

                        <PrimaryButton  className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Registrar
                        </PrimaryButton>
                        <Link href={route('dashboard')} className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={processing}>
                            Cerrar
                        </Link>


                
                    </div>
                </form>
            </div>
            
        </div>

      
    </AuthenticatedLayout>
  )
}


