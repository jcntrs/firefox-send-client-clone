import React, { useContext } from 'react';
import AppContext from '../contexts/app/AppContext';

const FileAlert = () => {
    const appContext = useContext(AppContext);
    const { fileMessage } = appContext;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-sm text-center mx-auto" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {fileMessage}</span>
        </div>
    );
}

export default FileAlert;