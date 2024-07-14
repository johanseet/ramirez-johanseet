// AnunciaPanama/anuncia-panama-frontend/src/hooks/useLogin.js
import { useState } from 'react';
import { useAuth } from '@contexts/authContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return { loginUser, loading };
};

export default useLogin;
