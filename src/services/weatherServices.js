const API_Key = 'bbd8a18ba619a15bafa273a9f4a09fd8';
const Base_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cache = new Map();

export async function fetchWeatherData(query, unit = 'metric') {
    const now = Date.now();
    let cacheKey = '';

    // Determine if query is lat/lon or city name
    let url = '';
    if (typeof query === 'string' && query.includes(',')) {
        // lat,lon format
        const [lat, lon] = query.split(',');
        cacheKey = `${lat}_${lon}_${unit}`;
        url = `${Base_URL}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_Key}`;
    } else {
        // city name
        cacheKey = `${query}_${unit}`;
        url = `${Base_URL}?q=${query}&units=${unit}&appid=${API_Key}`;
    }

    // Check cache
    if (cache.has(cacheKey)) {
        const { data, timestamp } = cache.get(cacheKey);
        if (now - timestamp < 300000) { // 5 min cache
            return data;
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather for ${query}`);
        }

        const data = await response.json();
        cache.set(cacheKey, { data, timestamp: now });
        return data;

    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
}
