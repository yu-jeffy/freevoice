import { useCallback, useEffect, useState, useContext, createContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from './firebase.js';  // Ensure this path is correct based on your project structure

const AuthContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = useCallback((email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  }, []);

  const signout = useCallback(() => {
    return signOut(firebaseAuth).then(() => {
      setUser(null);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signin,
    signout
  };
}

export default ProvideAuth;