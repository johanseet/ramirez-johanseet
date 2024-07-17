"use client";
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@contexts/onboardingContext';
import useBusinessRegister from '@hooks/useBusinessRegister';
import { useState } from 'react';

const UserInfo = () => {
  const router = useRouter();
  const { userInfo, setUserInfo, businessInfo, setBusinessId } = useOnboarding();
  const { businessRegister, loading, error } = useBusinessRegister();
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await businessRegister(userInfo, businessInfo);
      console.log('Business registered successfully:', response);
      setBusinessId(response.businessId);
      router.push('/business/onboarding/select-plan');
    } catch (err) {
      setFormError('Fallo al registrar el comercio. Intente de nuevo.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="px-4 sm:px-0">
            <img className="mx-auto h-48 w-auto" src="/images/logo.svg" alt="Logo de la empresa" />
            <h3 className="text-4xl font-bold leading-6 text-gray-900 text-center mt-1">Anuncia Panamá</h3>
            <p className="mt-6 text-sm text-gray-600 text-left">
              Por favor completa la siguiente información sobre el usuario.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">Información del Usuario</h3>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Nombre Completo" value={userInfo.fullName} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" value={userInfo.dateOfBirth} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <input type="text" name="username" id="username" placeholder="Nombre de Usuario" value={userInfo.username} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" name="email" id="email" placeholder="Correo Electrónico" value={userInfo.email} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="Contraseña" value={userInfo.password} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar Contraseña" value={userInfo.confirmPassword} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Seleccione Género</label>
                    <select name="gender" id="gender" value={userInfo.gender} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2">
                      <option value="">Seleccione</option>
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {loading ? 'Registrando...' : 'Registrar Comercio'}
                </button>
              </div>
              {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UserInfo.getLayout = function getLayout(page) {
  return (
    <OnboardingLayout>
      {page}
    </OnboardingLayout>
  );
};

export default UserInfo;
