
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        <div className="bg-[#0f3460] text-white p-4 shadow-md flex flex-wrap justify-between items-center gap-2">
            <Link to="/" className="text-2xl font-bold tracking-wide">🌦️ Weather App</Link>
            <div className="flex items-center gap-2 flex-wrap">
                {isAuthenticated && (
                    <>
                        <span className="text-sm">👤 {user.name}</span>
                        <button onClick={() => logout({ returnTo: window.location.origin })}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </>
                )}
                <Link to="/favorites" className="px-3 py-1 rounded hover:bg-blue-700">Favorites</Link>
            </div>
        </div>

    );

}

export default Navbar;
