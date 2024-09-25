import React, { useEffect, useState } from 'react';
import './Weather.css';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b559375d6105885990fce5f773d3aa32`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    };

    // Update the current date and time every second
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer); // Cleanup timer on unmount
    }, []);

    useEffect(() => {
        search("Malabe");
    }, []);

    return (
        <div className='weather'>
            <p className='cityname'>Malabe</p>
            <p className='datetime'>
                {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            {weatherData ? <>
                <div className='weather-header'>
                    <img src={weatherData.icon} alt='weather-icon' className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                </div>
            </> : <></>}
        </div>
    );
};

export default Weather;
