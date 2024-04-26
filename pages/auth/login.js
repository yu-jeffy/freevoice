import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';
import Layout from '../../components/Layout';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const Login = () => {
    const auth = useAuth();
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && document.getElementById('recaptcha-container')) {
            const authInstance = getAuth();
            window.recaptchaVerifier = new RecaptchaVerifier(authInstance, 'recaptcha-container', {
                'size': 'normal',  // Changed to 'normal' for visibility during testing
            });
            window.recaptchaVerifier.render().catch(error => {
                console.error("Recaptcha Error:", error);
            });
        }
    }, []);

    const handleSendCode = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const confirmationResult = await auth.sendVerificationCode(phoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmationResult);
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to send verification code. Please check your phone number and try again.');
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const user = await auth.verifyCode(confirmationResult, code);
            console.log('User logged in:', user);
            router.push('/'); // Redirect to the homepage after successful login
        } catch (error) {
            console.error('Verification error:', error);
            setError('Failed to verify code. Please check the code you entered and try again.');
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                <h1>Login with Phone</h1>
                {!confirmationResult ? (
                    <form onSubmit={handleSendCode}>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="phone" style={{ display: 'block' }}>Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px' }}
                            />
                            <div id="recaptcha-container"></div>
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>
                            Send Verification Code
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyCode}>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="code" style={{ display: 'block' }}>Verification Code</label>
                            <input
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>
                            Verify Code
                        </button>
                    </form>
                )}
                {error && (
                    <div style={{ color: 'red', marginBottom: '10px' }}>
                        {error}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Login;