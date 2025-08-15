import React, { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherData } from "../services/weatherServices";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";

const Home = () => {
    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric'); // metric = °C, imperial = °F

    const toggleUnit = () => setUnit(prev => prev === "metric" ? "imperial" : "metric");

    const handleSearch = async (cityName) => {
        try {
            setLoading(true);
            const data = await fetchWeatherData(cityName, unit);
            if (!data?.main) throw new Error("City not found");
            setCityData(prev => [data, ...prev.filter(c => c.name !== cityName)]);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "City not found");
        } finally {
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            try {
                setLoading(true);
                const data = await fetchWeatherData(`${coords.latitude},${coords.longitude}`, unit);
                if (!data?.main) throw new Error("Location weather not found");
                setCityData(prev => [data, ...prev.filter(c => c.name !== data.name)]);
                setError(null);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to get location weather");
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError("Failed to get location: " + err.message);
        });
    };

    return (
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] min-h-screen text-white p-4 transition-all">
            <Navbar />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 animate-fadeIn">🌏 Weather App</h1>

            {/* Control Panel */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 animate-fadeIn delay-200">
                <div className="flex-1 min-w-[200px]">
                    <SearchBar onSearch={handleSearch} />
                </div>

                <button
                    onClick={toggleUnit}
                    className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform shadow-lg"
                >
                    Switch to {unit === "metric" ? "°F" : "°C"}
                </button>

                <button
                    onClick={handleCurrentLocation}
                    className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600 hover:scale-105 transition-transform shadow-lg"
                >
                    🌍 Current Location
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg text-center mb-4 animate-fadeIn delay-300 shadow-lg">
                    {error} ⚠️
                </div>
            )}

            {/* Weather Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {loading
                    ? Array(4).fill(0).map((_, index) => <SkeletonCard key={index} />)
                    : cityData.length === 0
                        ? <p className="text-center col-span-full text-gray-300 animate-fadeIn delay-400">Search a city or use current location 🌤️</p>
                        : cityData.map((city, index) => (
                            <WeatherCard
                                key={index}
                                city={{
                                    name: city.name || "N/A",
                                    country: city.sys?.country || "N/A",
                                    temp: city.main?.temp,
                                    min: city.main?.temp_min,
                                    max: city.main?.temp_max,
                                    weather: city.weather[0]?.main || "Clear",
                                    icon: city.weather[0]?.icon,
                                    pressure: city.main?.pressure,
                                    humidity: city.main?.humidity,
                                    visibility: (city.visibility / 1000)?.toFixed(1) || "N/A",
                                    windSpeed: city.wind?.speed,
                                    windDeg: city.wind?.deg,
                                    sunrise: city.sys?.sunrise ? new Date(city.sys.sunrise * 1000).toLocaleTimeString() : "N/A",
                                    sunset: city.sys?.sunset ? new Date(city.sys.sunset * 1000).toLocaleTimeString() : "N/A",
                                    date: new Date().toLocaleString(),
                                }}
                                unit={unit}
                            />
                        ))
                }
            </div>

            {/* Animations */}
            <style>{`
                .animate-fadeIn {
                    opacity: 0;
                    animation: fadeIn 0.7s forwards;
                }
                .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
                .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
                .animate-fadeIn.delay-400 { animation-delay: 0.4s; }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Home;
