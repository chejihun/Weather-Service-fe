import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import MyLocation from './page/MyLocation';
import WeatherSevenDay from './page/WeatherSevenDay';
import SearchMenu from './page/SearchMenu';

function App() {

  const [weather, setWeather] = useState(null)
  const [dayWeather, setDayWeather] = useState(null)
  const bookmark = ['My Location', 'Seoul', 'NewYork', 'Tokyo' ]

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
      getSevenDayWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ko&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json();
    setWeather(data);
  };

  const getSevenDayWeatherByCurrentLocation = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const data2 = await response.json();
    setDayWeather(data2);
  };


  useEffect(() => {
    getCurrentLocation()
  }, []);

  return(
    <div>
       <MyLocation weather={weather} dayWeather={dayWeather}/>
       <WeatherSevenDay weather={weather} dayWeather={dayWeather}/>
       <SearchMenu bookmark={bookmark} />
    </div>
  )
}

export default App;
