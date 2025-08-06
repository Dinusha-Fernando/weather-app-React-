
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchWeatherData } from '../services/weatherServices';
import Navbar from '../components/Navbar';

const CityDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function getCityData() {
            const data = await fetchWeatherData(name);
            setWeather(data);
        }
        getCityData();
    }, [name]);

    if (!weather) return <p className="text-white text-center mt-10">Loading...</p>;

    const city = {
        name: weather.name,
        country: weather.sys.country,
        temp: weather.main.temp,
        min: weather.main.temp_min,
        max: weather.main.temp_max,
        weather: weather.weather[0].description,
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
        <div className="bg-[#1a1a2e] min-h-screen text-white p-6">
            <Navbar />
            <button onClick={() => navigate(-1)} className="mb-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                ← Back
            </button>
            <div className="bg-blue-500 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
                <h1 className="text-3xl font-bold">{city.name}, {city.country}</h1>
                <p className="text-sm mb-4">{city.date}</p>
                <div className="text-xl">{city.weather}</div>
                <div className="text-5xl font-bold">{city.temp}°C</div>
                <p className="text-sm">Min: {city.min}°C | Max: {city.max}°C</p>

                <div className="mt-4 space-y-1 text-sm">
                    <p> Wind: {city.windSpeed} m/s, {city.windDeg}°</p>
                    <p> Pressure: {city.pressure} hPa</p>
                    <p> Humidity: {city.humidity}%</p>
                    <p> Visibility: {city.visibility} km</p>
                    <p>Sunrise: {city.sunrise}</p>
                    <p> Sunset: {city.sunset}</p>
                </div>
            </div>
        </div>
    );
};

export default CityDetails;
