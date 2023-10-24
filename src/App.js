import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import MyLocation from './page/MyLocation';
import WeatherSevenDay from './page/WeatherSevenDay';
import SearchMenu from './page/SearchMenu';

function App() {

  const [weather, setWeather] = useState(null)
  const [dayWeather, setDayWeather] = useState(null)
  const bookmark = ['Seongnam-si', 'Seoul', 'New York', 'Tokyo']
  const [city, setCity] = useState('')
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
      getSevenDayWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ko&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  const getSevenDayWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    setDayWeather(data);
  };

  const searchWeather = async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const dayWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`;

    const [weatherResponse, dayWeatherResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(dayWeatherUrl)
    ]);

    const [weatherData, dayWeatherData] = await Promise.all([
      weatherResponse.json(),
      dayWeatherResponse.json()
    ]);

    setWeather(weatherData);
    setDayWeather(dayWeatherData);
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      searchWeather(city);
    }
  }, [city]);

  return (
    <div>
      <MyLocation
        weather={weather}
        searchWeather={searchWeather}
        toggleMenu={toggleMenu}
      />
      {isMenuVisible && <SearchMenu
        bookmark={bookmark}
        setCity={setCity}
        searchWeather={searchWeather}
        closeMenu={closeMenu}
      />}
      <WeatherSevenDay
        weather={weather}
        dayWeather={dayWeather}
        setCity={setCity}
      />
    </div>
  )
}

export default App;
