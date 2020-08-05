import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import AuthContext from '../contexts/auth/AuthContext';

const Header = () => {
    const authContext = useContext(AuthContext);
    const { user, getAuthenticatedUser, logOut } = authContext;
    console.log(user)
    useEffect(() => {
        getAuthenticatedUser();
    }, [])

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0" src="logo.png" />
            </Link>
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