"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { getUser } from '../utils/auth';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

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
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <span className="text-2xl font-bold">Anuncia Panamá</span>
      </Link>
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>
      <div className="flex items-center">
        <div className="mx-4 h-6 border-l border-gray-500"></div>
        <Link href="/businesses" className="mr-4">
          <span>Comercios</span>
        </Link>
        <div className="mx-4 h-6 border-l border-gray-500"></div>
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/login">
                <div className="flex items-center">
                  <FaSignInAlt className="mr-2" />
                  <span>Iniciar</span>
                </div>
              </Link>
              <Link href="/register">
                <div className="flex items-center">
                  <FaUserPlus className="mr-2" />
                  <span>Registrar</span>
                </div>
              </Link>
            </>
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
