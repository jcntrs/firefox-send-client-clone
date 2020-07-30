import React, { useContext } from 'react';
import AuthContext from '../contexts/auth/AuthContext';

const Alert = () => {
    const authContext = useContext(AuthContext);
    const { message, messageType } = authContext;
    const color = messageType ? 'green' : 'red';

    return (
        <div className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative max-w-sm text-center mx-auto`} role="alert">
            <strong className="font-bold">{messageType ? 'Éxito!' : 'Error!'}</strong>
            <span className="block sm:inline"> {message}</span>
        </div>
    );
}

export default Alert;