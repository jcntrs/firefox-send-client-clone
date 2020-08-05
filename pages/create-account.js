import React, { useContext } from 'react';
import { useFormik } from 'formik';
import AuthContext from '../contexts/auth/AuthContext';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import * as yup from 'yup';

const CreateAccount = () => {
    const authContext = useContext(AuthContext);
    const { message, createUser } = authContext

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            name: yup.string().trim().required('Nombre es obligatorio'),
            email: yup.string().required('Email es obligatorio').email('Email no válido'),
            password: yup.string().required('Contraseña es obligatoria').min(6, 'Contraseña minima debe contener 6 caracteres')
        }),
        onSubmit: values => {
            createUser(values);
        }
    });

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-500 text-center my-4">Crear Cuenta</h2>
                {message && <Alert />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form className="bg-white rounded shadow-lg px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name
                                    && <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 px-4 py-2">
                                        <p><span className="font-bold">Error:</span> {formik.errors.name}.</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email de usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email
                                    && <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 px-4 py-2">
                                        <p><span className="font-bold">Error:</span> {formik.errors.email}.</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña de usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password
                                    && <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 px-4 py-2">
                                        <p><span className="font-bold">Error:</span> {formik.errors.password}.</p>
                                    </div>
                                }
                            </div>
                            <input className="bg-gray-600 hover:bg-gray-500 w-full p-2 text-white font-bold cursor-pointer" type="submit" value="Crear Cuenta" />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateAccount;