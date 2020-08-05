import React from 'react';
import AuthState from '../contexts/auth/AuthState';
import AppState from '../contexts/app/AppState';

const App = ({ Component, pageProps }) => {
    return (
        <AuthState>
            <AppState>
                <Component {...pageProps} />
            </AppState>
        </AuthState>
    );
}

export default App;