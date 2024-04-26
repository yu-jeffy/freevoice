import React, { useState, useCallback } from 'react';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import ReCAPTCHA from '../../components/ReCAPTCHA';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignIn = useCallback(() => {
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        const code = window.prompt("Enter the verification code from the SMS");  // Or use a custom input method
        return confirmationResult.confirm(code);
      })
      .then((result) => {
         // User signed in successfully.
         console.log('User is signed in:', result.user);
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  }, [phoneNumber]);

  return (
    <div>
      <h1>SignIn with Phone</h1>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSignIn}>Send Verification Code</button>
      <ReCAPTCHA onVerify={() => console.log('Verified recaptcha')} />
    </div>
  );
}

export default Login;