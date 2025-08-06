export const getCardBgColor = (condition) => {
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'bg-yellow-400';
        case 'clouds':
            return 'bg-gray-400';
        case 'rain':
        case 'drizzle':
            return 'bg-blue-700';
        case 'thunderstorm':
            return 'bg-purple-700';
        case 'snow':
            return 'bg-white text-black';
        case 'mist':
        case 'haze':
            return 'bg-gray-300 text-black';
        default:
            return 'bg-blue-500';
    }
};