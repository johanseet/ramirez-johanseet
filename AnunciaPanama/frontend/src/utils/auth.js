import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const logout = async () => {
  await api.post('/api/auth/logout');
};

export const getUser = async () => {
  try {
    const response = await api.get('/api/auth/session');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo la sesión del usuario:', error);
    return null;
  }
};
