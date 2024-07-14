"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRoutes } from '@contexts/routeContext';
import useLogin from '@hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { loginUser, loading } = useLogin();
  const router = useRouter();
  const routes = useRoutes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      if (response.success) {
        router.push(routes.home);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-40 w-auto" src="/images/logo.svg" alt="Logo de la empresa" />
        <h2 className="mt-4 text-center text-3xl leading-9 font-extrabold text-primary">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600">
          O{' '}
          <a href={routes.user.register} className="font-medium text-primary hover:text-primary-dark">
            regístrate si no tienes cuenta
          </a>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-white">
          {error && (
            <div className="mb-4 text-red-700 bg-red-100 border border-red-400 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">¡Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-gray-900"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-gray-900"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a href={routes.auth.forgotPassword} className="font-medium text-primary hover:text-primary-dark">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:border-primary-dark focus:shadow-outline-primary active:bg-primary-dark transition duration-150 ease-in-out"
                >
                  {loading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
