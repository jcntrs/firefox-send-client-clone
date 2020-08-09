import React, { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import AppContext from '../../contexts/app/AppContext';
import FileAlert from '../../components/FileAlert';
import axiosClient from '../../config/axios';

export async function getServerSideProps({ params }) {
    const { enlace } = params
    const response = await axiosClient.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: response.data
        }
    }
}

export async function getServerSidePaths() {
    const response = await axiosClient.get('/api/enlaces');

    return {
        paths: response.data.links.map(link => ({
            params: { enlace: link.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {
    const appContext = useContext(AppContext);
    const { fileMessage, showAlert } = appContext;

    const [hasPassword, setHasPassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    const verifyPassword = async event => {
        event.preventDefault();

        const data = { password };

        try {
            const response = await axiosClient.post(`/api/enlaces/${enlace.url}`, data);
            setHasPassword(response.data.password);
        } catch (error) {
            showAlert(error.response.data.msg)
        }

    }

    return (
        <Layout>
            {
                hasPassword ?
                    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                        <p className="text-center px-5 mb-5">Este enlace esta protegido con contraseña, ingresala a continuación para descargar.</p>
                        {fileMessage && <FileAlert />}
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-x-lg">
                                <form className="bg-white rounded shadow-lg px-8 pt-6 pb-8 mb-4" onSubmit={verifyPassword}>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Contraseña del enlace"
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <input className="bg-gray-600 hover:bg-gray-500 w-full p-2 text-white font-bold cursor-pointer" type="submit" value="Validar Contraseña" />
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <h1 className="text-4xl text-center text-gray-600">Descarga tu enlace:</h1>
                        <div className="flex items-center justify-center mt-3 text-center">
                            <a href={`${process.env.backendURL}/api/archivos/${enlace.file}`} className="bg-green-600 hover:bg-green-500 w-64 p-2 text-white font-bold cursor-pointer mt-10 rounded-full">Aquí</a>
                        </div>
                    </>
            }

        </Layout>
    );
}