import { useEffect } from 'react';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

function ReCAPTCHA({ onVerify }) {
  useEffect(() => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow phone number signIn.
        if (onVerify) onVerify(response);
      }
    }, auth);
    window.recaptchaVerifier.render();
  }, [onVerify]);

  return <div id="recaptcha-container"></div>;
}

export default ReCAPTCHA;