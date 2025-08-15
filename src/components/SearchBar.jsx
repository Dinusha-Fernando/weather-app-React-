import React, { useState } from 'react';

const searchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (!city) return;
        onSearch(city);
        setCity("");
    };

    return (
        <div className='flex justify-center mb-6 gap-2'>
            <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Search City ....'
                className='p-2 rounded text-black'
            />

            <button
                onClick={handleSearch}
                className='bg-blue-600 px-4 rounded hover:bg-blue-700'
            >
                Search
            </button>
        </div>
    );
};

export default searchBar;