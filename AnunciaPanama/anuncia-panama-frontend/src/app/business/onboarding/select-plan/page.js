"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getPlans } from '@api/planService';
import OnboardingLayout from '../layout';

const SelectPlan = () => {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = useCallback(async () => {
    try {
      const data = await getPlans();
      setPlans(data);
      console.log('Se obtuvieron los planes:', data);
    } catch (error) {
      console.error("Error obteniendo los planes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = (planId) => {
    localStorage.setItem('selectedPlanId', planId);
    router.push('/business/onboarding/business-info');
  };

  return (
    <div className="bg-gray-50 text-primary space-y-24">
      <div id="plans" className="pt-4 sm:pt-6 lg:pt-8">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img className="mx-auto h-40 w-auto" src="/images/logo.svg" alt="Logo de la empresa" />
            <p className="mt-1 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Selecciona el plan perfecto para tu negocio
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gray-50 pb-8 sm:mt-6 sm:pb-10 lg:pb-12">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-50"></div>
          <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:justify-center lg:space-x-6">
              {loading ? (
                <div>Loading...</div>
              ) : (
                plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex-1 bg-white text-primary px-6 py-8 lg:p-12 m-4 rounded-lg shadow-lg transition-transform transform hover:border-4 hover:border-primary-light hover:scale-105"
                  >
                    <h3 className="text-2xl font-extrabold sm:text-3xl">{plan.name}</h3>
                    <p className="mt-4 text-base text-primary">{plan.description}</p>
                    <p className="mt-4 text-3xl font-extrabold">{plan.cost}</p>
                    <div className="mt-6">
                      <button
                        className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light"
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Seleccionar plan
                      </button>
                    </div>
                    <ul role="list" className="mt-8 space-y-4">
                      {plan.features && Array.isArray(plan.features) ? (
                        plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-6 w-6 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="ml-3 text-sm text-primary">{feature}</p>
                          </li>
                        ))
                      ) : (
                        <li>No features available</li>
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectPlan.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default SelectPlan;
