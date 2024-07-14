// src/hooks/useRegister.js
import { useState } from 'react';
import { useAuth } from '@contexts/authContext';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { registerUser } = useAuth();

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(userData);
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
