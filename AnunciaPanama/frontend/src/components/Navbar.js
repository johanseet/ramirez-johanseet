"use client";

import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser } from '../utils/auth';

const navigation = [
  { name: 'Comercios', href: '/businesses', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = getUser();
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <Disclosure as="nav" className="bg-primary w-full">
      {({ open }) => (
        <>
          <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <img
                  className="block h-8 w-auto ml-2"
                  src="/logo-white.svg"
                  alt="Anuncia Panamá"
                />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:flex items-center">
                  <img
                    className="block h-10 w-auto"
                    src="/logo-white.svg"
                    alt="Anuncia Panamá"
                  />
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-start">
                  <div className="w-full max-w-full lg:max-w-2xl">
                    <label htmlFor="search" className="sr-only">Buscar</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-100 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
                        placeholder="Buscar anuncios, ofertas, promociones..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={classNames(
                          item.current ? 'bg-primary-dark text-white' : 'text-white hover:bg-primary-light',
                          'rounded-md px-3 py-2 text-base font-medium cursor-pointer flex items-center'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  {!user && (
                    <>
                      <Link href="/login">
                        <span className="text-white hover:text-gray-200 cursor-pointer flex items-center">
                          <LockClosedIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="ml-1 hidden sm:inline">Ingresar</span>
                        </span>
                      </Link>
                      <Link href="/register">
                        <span className="text-white hover:text-gray-200 cursor-pointer flex items-center ml-4">
                          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="ml-1 hidden sm:inline">Registrar</span>
                        </span>
                      </Link>
                    </>
                  )}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user && (
                    <>
                      <button
                        type="button"
                        className="rounded-full bg-primary p-1 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark"
                      >
                        <span className="sr-only">Ver notificaciones</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark">
                            <span className="sr-only">Abrir menú de usuario</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Tu Perfil
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Configuración
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Cerrar sesión
                                </span>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="span"
                  className={classNames(
                    item.current ? 'bg-primary-dark text-white' : 'text-white hover:bg-primary-light',
                    'block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {!user && (
                <>
                  <Link href="/login">
                    <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primary-light cursor-pointer">
                      Ingresar
                    </span>
                  </Link>
                  <Link href="/register">
                    <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-primary-light cursor-pointer">
                      Registrar
                    </span>
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
