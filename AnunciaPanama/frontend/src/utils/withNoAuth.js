import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from './auth';

const withNoAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const user = await getUser();
        if (user) {
          router.replace('/'); // Redirige a la página de inicio si ya está autenticado
        }
      };
      checkUser();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withNoAuth;
