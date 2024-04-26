import { useCallback, useEffect, useState, useContext, createContext } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from './firebase';
import { isAdmin } from './isAdmin';
import { createUserProfile } from './user';


const AuthContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        //firebaseAuth.useDeviceLanguage(); // Optional: to handle automatic device language settings
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                const adminStatus = await isAdmin(user.uid);
                setIsUserAdmin(adminStatus);
                createUserProfile(user);
            } else {
                setIsUserAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const sendVerificationCode = useCallback((phoneNumber, recaptchaVerifier) => {
        return signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptchaVerifier)
            .then((confirmationResult) => {
                // SMS sent. Store confirmationResult to confirm the verification code later
                return confirmationResult;
            });
    }, []);

    const verifyCode = useCallback((confirmationResult, code) => {
        return confirmationResult.confirm(code)
            .then((result) => {
                setUser(result.user);
                return result.user;
            });
    }, []);

    const signout = useCallback(() => {
        return signOut(firebaseAuth).then(() => {
            setUser(null);
        });
    }, []);

    return {
        user,
        loading,
        sendVerificationCode,
        verifyCode,
        signout,
        isUserAdmin
    };
}

export default ProvideAuth;

