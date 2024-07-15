"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@api/authService';
import { registerUserService } from '@api/userService';
import { registerBusinessService } from '@api/businessService';

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
      console.error('No hay sesión activa:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const registerUser = async (userData) => {
    try {
      const registeredUser = await registerUserService(userData);
      setUser(registeredUser);
      router.push('/');
      return registeredUser;
    } catch (error) {
      throw error;
    }
  };

  const registerBusiness = async (businessData) => {
    try {
      const registeredBusiness = await registerBusinessService(businessData);
      setUser(registeredBusiness);
      router.push('/');
      return registeredBusiness;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, registerBusiness, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
