import React from 'react';
import AuthState from '../contexts/auth/AuthState';

const App = ({ Component, pageProps }) => {
    return (
        <AuthState>
            <Component {...pageProps} />
        </AuthState>
    );
}

export default App;