const API_Key = 'bbd8a18ba619a15bafa273a9f4a09fd8';
const Base_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cache = new Map();

export async function fetchWeatherData(city) {
    const now = Date.now();

    if (cache.has(city)) {
        const { data, timestamp } = cache.get(city);
        if (now - timestamp < 300000) {
            return data;
        }
    }

    const url = `${Base_URL}?q=${city}&units=metric&appid=${API_Key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather for ${city}`);
        }

        const data = await response.json();
        cache.set(city, { data, timestamp: now });
        return data;

    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
}
