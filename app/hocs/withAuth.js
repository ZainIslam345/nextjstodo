import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData ? userData.token : null;
        console.log(token,"token")
        if(!token) {
            router.push('/login');
        }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
