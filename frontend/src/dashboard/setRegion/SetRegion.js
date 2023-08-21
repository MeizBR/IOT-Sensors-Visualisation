import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SetRegion({ lat, lon }) {
    const [results, setResults] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return results.address && results.address.city;
}

export default SetRegion;
