"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '../utils/auth';

const UserMenu = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/images/user-placeholder.png" alt="User" className="w-8 h-8 rounded-full" />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <Link href="/profile">
            <span className="block px-4 py-2">Ver Perfil</span>
          </Link>
          <Link href="/settings">
            <span className="block px-4 py-2">Configurar</span>
          </Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2">Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
