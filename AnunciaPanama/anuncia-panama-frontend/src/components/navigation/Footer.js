//AnunciaPanama/anuncia-panama-frontend/src/components/navigation/Footer.js
"use client"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 w-full mt-auto">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-8">
          <div className="text-center md:text-left md:w-1/5">
          <Image src="/images/logo-white.svg" alt="Logo" width={150} height={50} />
            <p className="mt-4 text-base text-gray-100">
              Tu Puerta de Entrada a Grandes Ahorros.
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-100 hover:text-white">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white">
                <span className="sr-only">YouTube</span>
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:w-4/5">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-200">Soluciones</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Anuncios</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Promociones</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Ofertas</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Estadísticas</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-200">Soporte</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Precios</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Guías</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Centro de ayuda</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-200">Compañía</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Acerca de</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Empleos</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Socios</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-200">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Política de privacidad</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Términos de servicio</a></li>
                <li><a href="#" className="text-base text-gray-100 hover:text-white">Política de cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-200 pt-8">
        <p className="text-base text-center text-gray-200">
          © 2024 Anuncia Panamá. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
