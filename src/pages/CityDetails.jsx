import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../services/weatherServices';
import { getCardBgColor } from '../utils/weatherUtils';
import Navbar from '../components/Navbar';
import CountUp from 'react-countup';

const CityDetails = ({ unit = "metric" }) => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getCityData() {
            try {
                const data = await fetchWeatherData(name, unit);
                setWeather(data);
                setLoaded(true);
            } catch (err) {
                console.error(err);
            }
        }
        getCityData();
    }, [name, unit]);

    if (!weather) return <p className="text-white text-center mt-10">Loading...</p>;

    const city = {
        name: weather.name,
        country: weather.sys.country,
        temp: weather.main.temp,
        min: weather.main.temp_min,
        max: weather.main.temp_max,
        weather: weather.weather[0].description,
        icon: weather.weather[0].icon,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        visibility: (weather.visibility / 1000).toFixed(1),
        windSpeed: weather.wind.speed,
        windDeg: weather.wind.deg,
        sunrise: new Date(weather.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weather.sys.sunset * 1000).toLocaleTimeString(),
        date: new Date().toLocaleString(),
    };

    return (
        <div className="bg-[#1a1a2e] min-h-screen text-white">
            {/* Navbar stays at the top */}
            <Navbar />

            {/* Card container centered */}
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
                <div
                    className={`${getCardBgColor(city.weather)} bg-gradient-to-br p-6 rounded-3xl shadow-2xl max-w-xl w-full transform transition-all duration-700 ease-in-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    {/* Header: Back arrow + City name */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white text-2xl font-bold hover:text-gray-300 transition"
                            aria-label="Go Back"
                        >
                            ←
                        </button>
                        <div className="text-center flex-1 mx-4">
                            <h1 className="text-4xl font-bold animate-fadeIn">{city.name}</h1>
                            <p className="text-sm text-gray-200 animate-fadeIn delay-100">{city.country} • {city.date}</p>
                        </div>
                        {city.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                                alt={city.weather}
                                className="w-20 h-20 animate-bounce"
                            />
                        )}
                    </div>

                    {/* Temperature */}
                    <div className="text-center mb-6">
                        <p className="text-xl capitalize animate-fadeIn delay-200">{city.weather}</p>
                        <p className="text-6xl font-extrabold mt-1 animate-fadeIn delay-300">
                            <CountUp end={city.temp} duration={1.5} />°{unit === "metric" ? "C" : "F"}
                        </p>
                        <p className="text-sm mt-2 animate-fadeIn delay-400">
                            Min: {city.min}°{unit === "metric" ? "C" : "F"} | Max: {city.max}°{unit === "metric" ? "C" : "F"}
                        </p>
                    </div>

                    {/* Weather Info Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center transform transition hover:scale-105 duration-300 animate-fadeIn delay-500">
                            <p>💨 Wind</p>
                            <p>{city.windSpeed} m/s, {city.windDeg}°</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center transform transition hover:scale-105 duration-300 animate-fadeIn delay-600">
                            <p>🌡 Pressure</p>
                            <p>{city.pressure} hPa</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center transform transition hover:scale-105 duration-300 animate-fadeIn delay-700">
                            <p>💧 Humidity</p>
                            <p>{city.humidity}%</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center transform transition hover:scale-105 duration-300 animate-fadeIn delay-800">
                            <p>👁 Visibility</p>
                            <p>{city.visibility} km</p>
                        </div>
                    </div>

                    {/* Sunrise & Sunset */}
                    <div className="flex justify-between text-sm text-gray-200 animate-fadeIn delay-900">
                        <p>🌅 Sunrise: {city.sunrise}</p>
                        <p>🌇 Sunset: {city.sunset}</p>
                    </div>
                </div>
            </div>

            {/* Animation CSS */}
            <style>
                {`
                .animate-fadeIn {
                    opacity: 0;
                    animation: fadeIn 0.7s forwards;
                }
                .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
                .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
                .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
                .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
                .animate-fadeIn.delay-500 { animation-delay: 0.5s; }
                .animate-fadeIn.delay-600 { animation-delay: 0.6s; }
                .animate-fadeIn.delay-700 { animation-delay: 0.7s; }
                .animate-fadeIn.delay-800 { animation-delay: 0.8s; }
                .animate-fadeIn.delay-900 { animation-delay: 0.9s; }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                .animate-bounce {
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10%); }
                }
                `}
            </style>
        </div>
    );
};

export default CityDetails;
