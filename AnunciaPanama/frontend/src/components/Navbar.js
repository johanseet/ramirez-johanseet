"use client";  // Esta línea debe estar al principio del archivo

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { getUser } from '../utils/auth';

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
      <SearchBar />
      <div className="flex items-center">
        {!user ? (
          <>
            <Link href="/login">
              <span className="mr-4">Iniciar Sesión</span>
            </Link>
            <Link href="/register">
              <span>Registrar</span>
            </Link>
          </>
        ) : (
          <UserMenu user={user} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
