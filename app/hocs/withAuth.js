import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  const router = useRouter();

  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData ? userData.token : null;
      console.log(token,"token")
      if(!token) {
          router.push('/login');
      }
  }, []);

  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

WithAuth.displayName = 'WithAuth';

export default WithAuth;
