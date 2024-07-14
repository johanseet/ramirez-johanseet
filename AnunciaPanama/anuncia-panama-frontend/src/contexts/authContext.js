// src/contexts/authContext.js
"use client"
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@api/authService';
import { register } from '@api/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUserSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('No active session found:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('AuthProvider mounted');
    checkUserSession();
  }, [checkUserSession]);

  const registerUser = async (userData) => {
    try {
      const registeredUser = await register(userData);
      setUser(registeredUser);
      router.push('/'); // Redireccionar a la página principal
      return registeredUser;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
