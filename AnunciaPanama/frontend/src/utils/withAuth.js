import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from './auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = getUser();
      if (!user) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
