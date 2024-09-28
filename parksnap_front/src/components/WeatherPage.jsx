import React from "react";
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import Weather from "./Weather";
import './WeatherPage.css'


const WeatherPage = () => {
  return (
    <div className="weather-page">
      <NavigationBar/>
      <div className="weather-container">
        <Weather/>
      </div>
      <Footer/> 
    </div>
  );
};

export default WeatherPage;
