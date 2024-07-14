"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { FaBullhorn, FaChartLine, FaUsers } from 'react-icons/fa';
import { getPlans } from '@api/planService';
import { useRouter } from 'next/navigation';

const PlanSelection = () => {
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
    return () => {
    };
  }, [fetchPlans]);

  const handleSelectPlan = (planId) => {
    localStorage.setItem('selectedPlanId', planId);
    router.push('/business/onboarding/business-info');
  };

  const faqs = [
    {
      question: "¿Qué es la publicidad?",
      answer: "La publicidad es una forma de comunicación que intenta incrementar el consumo de un producto o servicio, mejorar la imagen de una marca o reposicionar un producto en la mente de un consumidor.",
    },
    {
      question: "¿Cómo funciona la aplicación publicitaria?",
      answer: "La aplicación permite a los clientes crear anuncios, ofertas, promociones de sus servicios, productos, eventos, marca, empresa a costos más bajos que los tradicionales.",
    },
    {
      question: "¿Qué objetivos puede tener la publicidad?",
      answer: "Algunos objetivos típicos son: dar a conocer un nuevo producto, cambiar la actitud hacia la marca, renovar la imagen de un producto, aumentar las ventas a corto plazo, mejorar la imagen de la empresa, entre otros.",
    },
    {
      question: "¿Qué es una campaña de lanzamiento?",
      answer: "Una campaña de lanzamiento busca dar a conocer la existencia de un nuevo producto o servicio en el mercado.",
    },
    {
      question: "¿Cómo puedo segmentar mis anuncios?",
      answer: "Nuestra plataforma ofrece herramientas avanzadas para segmentar anuncios según intereses y comportamientos de búsqueda de los usuarios.",
    },
    {
      question: "¿Qué beneficios tiene una aplicación publicitaria?",
      answer: "Facilita la creación de promociones, cupones, ofertas y descuentos, y mantiene un canal de comunicación directo y personalizado entre marca y cliente.",
    },
  ];

  const features = [
    {
      title: "Amplia Visibilidad",
      description: "Utiliza nuestras herramientas avanzadas de segmentación para alcanzar a tu audiencia ideal y aumentar el reconocimiento de tu marca.",
      icon: <FaBullhorn className="h-6 w-6 text-primary-light" />
    },
    {
      title: "Análisis Detallado",
      description: "Accede a informes detallados sobre el rendimiento de tus anuncios, incluyendo tasas de clics, conversiones y retorno de inversión (ROI).",
      icon: <FaChartLine className="h-6 w-6 text-primary-light" />
    },
    {
      title: "Interacción con Clientes",
      description: "Fomenta relaciones sólidas con tus clientes mediante anuncios personalizados y campañas de marketing directo.",
      icon: <FaUsers className="h-6 w-6 text-primary-light" />
    },
  ];

  return (
    <div className="bg-gray-50 text-primary space-y-24">
      <div className="pt-12 sm:pt-16 lg:pt-20 mb-24">
        <div className="relative text-primary">
          <div className="absolute inset-0">
            <div className="bg-gradient-to-r from-primary to-primary-light opacity-90"></div>
          </div>
          <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
                  Potencia tu negocio con Anuncia Panamá
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary">
                  Nuestra plataforma permite a las empresas crear y gestionar anuncios de manera fácil y económica dentro de Anuncia Panamá, alcanzando a la audiencia correcta en el momento adecuado.
                </p>
                <p className="mt-4 text-lg leading-6 text-primary">
                  Con herramientas avanzadas de segmentación y análisis, Anuncia Panamá te ayudará a maximizar tu retorno de inversión y a construir relaciones sólidas con tus clientes sin salir de nuestra plataforma.
                </p>
                <div className="mt-8 flex">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#plans"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-light hover:bg-primary-dark"
                    >
                      Ver Planes
                    </a>
                  </div>
                  <div className="inline-flex rounded-md shadow ml-4">
                    <button
                      onClick={() => router.push('/business/onboarding/business-info')}
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-700"
                    >
                      Comience ahora
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-span-5">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  alt="Panel de control de Anuncia Panamá"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <p className="mx-auto mt-2 max-w-2xl text-xl text-primary">
              Descubre cómo nuestras herramientas avanzadas pueden ayudarte a alcanzar tus objetivos de negocio.
            </p>
          </div>
          <div className="mt-10 lg:mt-20">
            <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
              {features.map((feature) => (
                <div key={feature.title} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-primary">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-primary">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div id="plans" className="pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-primary">Planes de Suscripción</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Encuentra el plan perfecto para tu negocio
            </p>
            <p className="mx-auto mt-2 max-w-4xl text-xl text-primary">
              Ofrecemos planes que se adaptan a las necesidades de todo tipo de empresas, desde pequeñas hasta grandes corporaciones.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 pb-12 sm:mt-12 sm:pb-16 lg:pb-24">
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
                    className={`flex-1 bg-white text-primary px-6 py-8 lg:p-12 m-4 rounded-lg shadow-lg transition-transform transform hover:border-4 hover:border-primary-light hover:scale-105`}
                  >
                    <h3 className="text-2xl font-extrabold sm:text-3xl">{plan.name}</h3>
                    <p className="mt-4 text-base text-primary">{plan.description}</p>
                    <p className="mt-4 text-3xl font-extrabold">{plan.cost}</p>
                    <div className="mt-6">
                      <button
                        className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light`}
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

      <div className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-primary">Preguntas Frecuentes</h2>
              <p className="mt-4 text-lg text-primary">
                ¿Tienes alguna otra pregunta y no encuentras la respuesta que buscas? Contacta a nuestro equipo de soporte enviando un{' '}
                <a href="mailto:support@example.com" className="font-medium text-primary hover:underline">
                  correo electrónico
                </a>{' '}
                y te responderemos lo antes posible.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg leading-6 font-medium text-primary">{faq.question}</dt>
                    <dd className="mt-2 text-base text-primary">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
