import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
  

  <div className="flex shadow-md">

    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width:'24rem',height:'32rem'}}>
      <div className="w-72">
  
        <h1 className="text-xl font-semibold">Bienvenido</h1>
  
        <form className="mt-4" onSubmit={submit}>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Correo</label>
            <TextInput 
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />

          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Contraseña</label>

            <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="*****"
                value={data.password}
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mb-3 flex flex-wrap content-center">
          <label className="mr-auto text-xs font-semibold">
                        <Checkbox
                        className='mr-1 checked:bg-purple-700'
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Recordarme</span>
                    </label>





            <Link href="/" className="text-xs font-semibold text-purple-700">Ir a principal?</Link>
          </div>

          <div className="mb-3">
        

            <button disabled={processing} className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Ingresar</button>



       
          </div>
        </form>

     
     {/*    <div className="text-center">
          <span className="text-xs text-gray-400 font-semibold">No tengo una cuenta?</span>
          <Link href={route('register')} className="text-xs font-semibold text-purple-700">Registrarme</Link>
 
        </div> */}
      </div>
    </div>


    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width:'24rem',height:'32rem'}}>

      <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="/assets/image/6.jpg"/>
    </div>

  </div>


  <div className="mt-3 w-full">
      <p className="text-center">Llallagua - Bolivia</p>
  </div>
</div>
        </>
    );
}
