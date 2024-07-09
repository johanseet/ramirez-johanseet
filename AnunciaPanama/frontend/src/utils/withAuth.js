import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from './auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        try {
          const { user } = await getUser();
          if (!user) {
            router.replace('/login');
          }
        } catch {
          router.replace('/login');
        }
      };
      checkUser();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
