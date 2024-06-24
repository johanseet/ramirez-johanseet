"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser, logout } from '../../utils/auth';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        logout();
        router.push('/login');
      }
    };
    fetchProfile();
  }, []);

  return user ? (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Cargando...</p>
  );
}
