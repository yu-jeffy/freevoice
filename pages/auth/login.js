import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';
import Layout from '../../components/Layout';  // Assuming you have a common Layout component

const Login = () => {
    const auth = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();  // Prevent the form from submitting the traditional way
        setError('');  // Clear any previous errors

        try {
            await auth.signin(email, password);
            router.push('/');  // Redirect to the homepage after successful login
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to log in. Please check your credentials and try again.');
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email" style={{ display: 'block' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password" style={{ display: 'block' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    {error && (
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            {error}
                        </div>
                    )}
                    <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>
                        Log In
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Login;