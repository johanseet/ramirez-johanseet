"use client";
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@contexts/onboardingContext';
import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import useBusinessTypes from '@hooks/useBusinessTypes';

const BusinessInfo = () => {
  const router = useRouter();
  const { businessInfo, setBusinessInfo } = useOnboarding();
  const { businessTypes, loading, error } = useBusinessTypes();
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/business/onboarding/user-info');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="px-4 sm:px-0">
            <img className="mx-auto h-48 w-auto" src="/images/logo.svg" alt="Logo de la empresa" />
            <h3 className="text-4xl font-bold leading-6 text-gray-900 text-center mt-1">Anuncia Panamá</h3>
            <p className="mt-6 text-sm text-gray-600 text-left">
              Por favor completa la siguiente información sobre tu comercio.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <h3 className="text-2xl font-medium leading-6 text-gray-900">Información del comercio</h3>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Nombre del comercio</label>
                    <input type="text" name="businessName" id="businessName" value={businessInfo.businessName} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" required />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea name="businessDescription" id="businessDescription" value={businessInfo.businessDescription} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md p-2"></textarea>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <textarea name="address" id="address" value={businessInfo.address} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md p-2"></textarea>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <input type="email" name="contactEmail" id="contactEmail" value={businessInfo.contactEmail} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="text" name="contactPhone" id="contactPhone" value={businessInfo.contactPhone} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">URL del sitio web</label>
                    <input type="url" name="websiteUrl" id="websiteUrl" value={businessInfo.websiteUrl} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="businessTypeId" className="block text-sm font-medium text-gray-700">Categoría del comercio</label>
                    <select name="businessTypeId" id="businessTypeId" value={businessInfo.businessTypeId} onChange={handleChange} className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md h-12 p-2" required>
                      <option value="">Seleccione una categoría</option>
                      {businessTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {loading && <p>Cargando categorías...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>

                  <div className="col-span-6">
                    <h4 className="text-lg font-medium leading-6 text-gray-900">Redes sociales</h4>
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center space-x-2">
                    <FaFacebook className="text-blue-600" />
                    <input type="url" name="facebookUrl" id="facebookUrl" value={businessInfo.facebookUrl} onChange={handleChange} placeholder="URL de Facebook" className="mt-1 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center space-x-2">
                    <FaTwitter className="text-blue-400" />
                    <input type="url" name="twitterUrl" id="twitterUrl" value={businessInfo.twitterUrl} onChange={handleChange} placeholder="URL de Twitter" className="mt-1 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center space-x-2">
                    <FaInstagram className="text-pink-600" />
                    <input type="url" name="instagramUrl" id="instagramUrl" value={businessInfo.instagramUrl} onChange={handleChange} placeholder="URL de Instagram" className="mt-1 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center space-x-2">
                    <FaYoutube className="text-red-600" />
                    <input type="url" name="youtubeUrl" id="youtubeUrl" value={businessInfo.youtubeUrl} onChange={handleChange} placeholder="URL de YouTube" className="mt-1 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md h-12 p-2" />
                  </div>

                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Siguiente
                </button>
              </div>
              {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

BusinessInfo.getLayout = function getLayout(page) {
  return (
    <OnboardingLayout>
      {page}
    </OnboardingLayout>
  );
};

export default BusinessInfo;
