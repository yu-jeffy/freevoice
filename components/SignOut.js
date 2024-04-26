import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const SignOut = () => {
    const router = useRouter();

    const logout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            // Sign-out successful.
            router.push('/'); // Redirect to home page after logout
        } catch (error) {
            // An error happened.
            console.error("Logout Error:", error);
        }
    };

    return (
        <button onClick={logout}>Logout</button>
    );
};

export default SignOut;