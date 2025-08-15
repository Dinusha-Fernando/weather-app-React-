export const getCardBgColor = (condition) => {
    if (!condition) return 'bg-blue-500';

    condition = condition.toLowerCase();

    if (condition.includes('clear'))
        return 'bg-yellow-400';

    if (condition.includes('cloud'))
        return 'bg-gray-400';

    if (condition.includes('rain') || condition.includes('drizzle'))
        return 'bg-blue-700';

    if (condition.includes('thunderstorm'))
        return 'bg-purple-700';

    if (condition.includes('snow'))
        return 'bg-white text-black';

    if (condition.includes('mist') || condition.includes('haze'))
        return 'bg-gray-300 text-black';


    return 'bg-blue-500';
};
