import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppContext from '../contexts/app/AppContext';
import AuthContext from '../contexts/auth/AuthContext';

const Header = () => {
    const router = useRouter();

    const appContext = useContext(AppContext);
    const { cleanState } = appContext;

    const authContext = useContext(AuthContext);
    const { user, getAuthenticatedUser, logOut } = authContext;

    const redirect = () => {
        router.push('/');
        cleanState();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && getAuthenticatedUser();
    }, [])

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.png" onClick={redirect} />
            <div>
                {user
                    ? <div className="flex items-center">
                        <p className="mr-2">Hola {user.name}</p>
                        <button className="bg-red-600 px-5 py-3 rounded-lg text-white font-bold" type="button" onClick={logOut}>Cerrar Sesión</button>
                    </div>
                    : <>
                        <Link href="/login">
                            <a className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold mr-2">Iniciar Sesión</a>
                        </Link>
                        <Link href="/create-account">
                            <a className="bg-orange-500 px-5 py-3 rounded-lg text-white font-bold">Crear Cuenta</a>
                        </Link>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;