import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nombre: '',
        apellido: '',
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

        post(route('register'));
    };

    return (
        <>
          <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
    
            <div className="flex shadow-md">

              <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width:'24rem',height:'32rem'}}>
                <div className="w-72">
            
                  <h1 className="text-xl font-semibold">Registro</h1>
                  <small className="text-gray-400">Registre Nuevo usuario</small>

                
                  <form className="mt-4" onSubmit={submit}>
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

                              <InputError message={errors.name} className="mt-2" />
              
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
                





                      <a href="#" className="text-xs font-semibold text-purple-700">Forgot password?</a>
                    </div>

                    <div className="mb-3">
                  

                      <button disabled={processing} className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Register</button>



                
                    </div>
                  </form>

              
                  <div className="text-center">
                    <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
                    <Link href={route('register')} className="text-xs font-semibold text-purple-700">Registrarme</Link>
          
                  </div>
                </div>
              </div>


              <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width:'24rem',height:'32rem'}}>

                <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FRBoi0qfVsmDVAWwTLc7KWsjn0fBduQ5zVufjU6ZvgXCY2vi07pqSGcxRUF4f6LELyA&usqp=CAU"/>
              </div>

            </div>


            <div className="mt-3 w-full">
                <p className="text-center">Made by <a target="_blank" href="https://www.instagram.com/_inubayuaji/" className="text-purple-700">Inu Bayu Aji</a> and ispired by <a target="_blank" href="https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI" className="text-purple-700">this</a>.</p>
            </div>
          </div>
        </>
    );
}
