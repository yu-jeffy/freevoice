import ProvideAuth from '../lib/auth.js';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}

export default MyApp;