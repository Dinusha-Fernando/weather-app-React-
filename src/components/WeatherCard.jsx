
import React from 'react';
import { Link } from 'react-router-dom';
import { getCardBgColor } from '../utils/weatherUtils';


const WeatherCard = ({ city }) => {
    return (
        <Link to={`/city/${city.name}`}>
            <div className={`${getCardBgColor(city.weather)} text-white p-4 rounded-xl shadow-lg w-full sm:w-64 hover:scale-105 transition-transform duration-200`}>


                <h2 className="text-xl font-bold">{city.name}, {city.country}</h2>
                <p className="text-sm">{city.date}</p>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="text-lg">{city.weather}</p>
                        <p className="text-2xl font-bold">{city.temp}°C</p>
                    </div>
                    <div>
                        <p className="text-sm">Min: {city.min}°C</p>
                        <p className="text-sm">Max: {city.max}°C</p>
                        {city.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                                alt={city.weather}
                                className="w-12 h-12 mt-1"
                            />
                        )}
                    </div>
                </div>
                <div className="mt-3 text-sm">
                    <p>Pressure: {city.pressure}hPa</p>
                    <p>Humidity: {city.humidity}%</p>
                    <p>Visibility: {city.visibility}km</p>
                </div>
                <div className="mt-3 text-sm flex justify-between items-center">
                    <p>💨 {city.windSpeed}m/s {city.windDeg}°</p>
                    <div>
                        <p> {city.sunrise}</p>
                        <p> {city.sunset}</p>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default WeatherCard;
