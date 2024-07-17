"use client";
import { useRouter } from 'next/navigation';
import { useOnboarding } from '../../../../contexts/onboardingContext';
import OnboardingLayout from '../layout';
import { useState } from 'react';
import PayPalButton from '@components/common/PayPalButton';

const Payment = () => {
  const router = useRouter();
  const { selectedPlan, businessId } = useOnboarding();
  const [formError, setFormError] = useState(null);

  console.log("businessId:",businessId)
  console.log(businessId)

  if (!selectedPlan) {
    router.push('/business/onboarding/select-plan');
  }

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="px-4 sm:px-0">
            <img className="mx-auto h-48 w-auto" src="/images/logo.svg" alt="Logo de la empresa" />
            <h3 className="text-4xl font-bold leading-6 text-gray-900 text-center mt-1">Anuncia Panamá</h3>
            <p className="mt-6 text-sm text-gray-600 text-left">
              Por favor confirma la información del plan seleccionado.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Información del plan</h3>
              <dl className="mt-5 border-t border-gray-200 divide-y divide-gray-200">
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Plan</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedPlan.name}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedPlan.description}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Costo</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${selectedPlan.cost}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Características</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="list-disc list-inside">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-center">

              <PayPalButton planId={selectedPlan.paypal_plan_id} businessId={businessId} />
            </div>
            {formError && <div className="text-red-500 text-sm mt-2">{formError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

Payment.getLayout = function getLayout(page) {
  return (
    <OnboardingLayout>
      {page}
    </OnboardingLayout>
  );
};

export default Payment;
