import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";

const withAuth = (Component) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          Router.push('/auth/login');
        } else {
          setVerified(true);
        }
      });
    }, [Router]);

    if (!verified) {
      return <div>Loading...</div>; // Or any other loading state indication
    }

    return <Component {...props} />;
  };
};

export default withAuth;