// src/hoc/withAuth.js
import { useAuth } from '@contexts/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/login'); // Redirigir a la página de login si no está autenticado
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <div>Loading...</div>; // Puedes poner un spinner aquí
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
