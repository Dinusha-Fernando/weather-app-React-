import React from 'react';
import { Link } from 'react-router-dom';
import { getCardBgColor } from '../utils/weatherUtils';

const WeatherCard = ({ city, unit = "metric" }) => {
    const [favorite, setFavorite] = React.useState(false);

    // Toggle favorite and save to localStorage
    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation(); // prevent Link navigation

        const favorites = JSON.parse(localStorage.getItem('favorites') || "[]");

        if (favorite) {
            const updated = favorites.filter(fav => fav.name !== city.name);
            localStorage.setItem('favorites', JSON.stringify(updated));
        } else {
            if (!favorites.some(fav => fav.name === city.name)) {
                favorites.push(city);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        }

        setFavorite(!favorite);
    };

    // Check if the city is already in favorites
    React.useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorite(favorites.some(fav => fav.name === city.name));
    }, [city.name]);

    return (
        <Link to={`/city/${city.name}`}>
            <div
                className={`${getCardBgColor(city.weather)} text-white p-5 rounded-2xl shadow-lg w-full sm:w-64 hover:scale-105 transform transition-transform duration-300`}
            >
                {/* Header: City name + Favorite */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">{city.name}</h2>
                    <button onClick={toggleFavorite} className="text-2xl hover:scale-110 transition">{favorite ? "💛" : "🤍"}</button>
                </div>

                {/* Subheader: Country + Date */}
                <h3 className="text-sm font-semibold mb-2">{city.name}, {city.country}</h3>
                <p className="text-xs mb-3">{city.date}</p>

                {/* Weather + Temp */}
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-lg capitalize">{city.weather}</p>
                        <p className="text-3xl font-bold">{city.temp}°{unit === "metric" ? "C" : "F"}</p>
                    </div>
                    {city.icon && (
                        <img
                            src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                            alt={city.weather}
                            className="w-16 h-16"
                        />
                    )}
                </div>

                {/* Min/Max Temp */}
                <div className="flex justify-between text-sm mb-3">
                    <p>Min: {city.min}°{unit === "metric" ? "C" : "F"}</p>
                    <p>Max: {city.max}°{unit === "metric" ? "C" : "F"}</p>
                </div>

                {/* Additional Info */}
                <div className="text-sm space-y-1 mb-3">
                    <p>💨 Wind: {city.windSpeed} m/s, {city.windDeg}°</p>
                    <p>🌡 Pressure: {city.pressure} hPa</p>
                    <p>💧 Humidity: {city.humidity}%</p>
                    <p>👁 Visibility: {city.visibility} km</p>
                    <p>🌅 Sunrise: {city.sunrise}</p>
                    <p>🌇 Sunset: {city.sunset}</p>
                </div>

                {/* Footer / CTA could go here if needed */}
            </div>
        </Link>
    );
};

export default WeatherCard;
