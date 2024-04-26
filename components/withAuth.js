import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";

const withAuth = (Component) => {
  return function WithAuth(props) {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setVerified(true);
        } else {
          Router.push('/auth/login');
        }
      });

      // Cleanup on unmount, avoid memory leaks
      return () => unsubscribe();
    }, [Router]);

    if (!verified) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;