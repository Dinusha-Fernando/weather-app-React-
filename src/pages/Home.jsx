import React, { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherData } from "../services/weatherServices";
import Navbar from "../components/Navbar";

const cities = ['Colombo', 'Tokyo', 'London', 'New York',];


// const dummyData = [
//     {
//         name: "Colombo",
//         country: "LK",
//         temp: 27,
//         min: 25,
//         max: 28,
//         weather: "Few Clouds",
//         pressure: 1018,
//         humidity: 78,
//         visibility: 8,
//         windSpeed: 4.0,
//         windDeg: 120,
//         sunrise: "6:05am",
//         sunset: "6:05pm",
//         date: "9.19am, Feb 8"
//     },
//     {
//         name: "Rathnapura",
//         country: "LK",
//         temp: 20,
//         min: 15,
//         max: 20,
//         weather: "Few Clouds",
//         pressure: 1018,
//         humidity: 78,
//         visibility: 8,
//         windSpeed: 4.0,
//         windDeg: 120,
//         sunrise: "6:05am",
//         sunset: "6:05pm",
//         date: "9.19am, Feb 8"
//     },

// ];

const Home = () => {

    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getWeather() {
            try {
                setLoading(true);
                const promises = cities.map(city => fetchWeatherData(city));
                const results = await Promise.all(promises);
                console.log('Fetched cities:', results);  // <- Add this log
                setCityData(results);
            } catch (err) {
                setError(err.message || 'Error fetching weather');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        getWeather();
    }, []);


    return (
        <div className="bg-[#1a1a2e] min-h-screen text-white p-4">
            <Navbar />
            <h1 className="text-3xl font-bold text-center mb-6">🌏 Weather App</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">

                {cityData.map((city, index) => (
                    <WeatherCard
                        key={index}
                        city={{
                            name: city.name,
                            country: city.sys.country,
                            temp: city.main.temp,
                            min: city.main.temp_min,
                            max: city.main.temp_max,
                            weather: city.weather[0].description,
                            pressure: city.main.pressure,
                            humidity: city.main.humidity,
                            visibility: (city.visibility / 1000).toFixed(1),
                            windSpeed: city.wind.speed,
                            windDeg: city.wind.deg,
                            sunrise: new Date(city.sys.sunrise * 1000).toLocaleTimeString(),
                            sunset: new Date(city.sys.sunset * 1000).toLocaleTimeString(),
                            date: new Date().toLocaleString(),
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;