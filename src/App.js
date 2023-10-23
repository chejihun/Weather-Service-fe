import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import MyLocation from './page/MyLocation';
import WeatherSevenDay from './page/WeatherSevenDay';

function App() {

  const [weather, setWeather] = useState(null)

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ko&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation()
  }, []);

  return(
    <div>
       <MyLocation weather={weather}/>
       <WeatherSevenDay weather={weather}/>
    </div>
  )
}

export default App;
