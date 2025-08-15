import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { getCardBgColor } from '../utils/weatherUtils';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    // Remove a city from favorites
    const removeFavorite = (cityName) => {
        const updated = favorites.filter(fav => fav.name !== cityName);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] min-h-screen text-white p-4">
            <Navbar />

            {/* Back to Home Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                    ← Back to Home
                </button>
            </div>

            <h1 className="text-4xl font-extrabold text-center mb-6 animate-fadeIn">💛 Favorite Cities</h1>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-300">No favorites yet. Go add some! 🌤️</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((city, index) => (
                        <div
                            key={index}
                            className={`${getCardBgColor(city.weather)} p-5 rounded-2xl shadow-lg w-full sm:w-64 relative`}
                        >
                            {/* Smaller Remove button */}
                            <button
                                onClick={() => removeFavorite(city.name)}
                                className="absolute top-2 right-2 text-lg hover:scale-110 transition"
                            >
                                ❌
                            </button>

                            <Link to={`/city/${city.name}`}>
                                <h2 className="text-xl font-bold mb-1">{city.name}</h2>
                                <h3 className="text-sm font-semibold mb-2">{city.country}</h3>
                                <p className="text-lg capitalize mb-2">{city.weather}</p>
                                <p className="text-3xl font-bold">{city.temp}°{city.unit === 'metric' ? 'C' : 'F'}</p>
                                {city.icon && (
                                    <img
                                        src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                                        alt={city.weather}
                                        className="w-16 h-16"
                                    />
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .animate-fadeIn {
                    opacity: 0;
                    animation: fadeIn 0.7s forwards;
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Favorites;
