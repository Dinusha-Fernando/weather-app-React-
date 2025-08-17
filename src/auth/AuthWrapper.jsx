
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthWrapper = ({ children }) => {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();


    const redirectUri =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173/login'
            : 'https://weather-app-react-five-alpha.vercel.app/login';


    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    if (isLoading || !isAuthenticated) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthWrapper;
