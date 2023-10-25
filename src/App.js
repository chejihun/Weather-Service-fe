import './App.css';
import { Routes, Route } from "react-router-dom";import { useEffect, useState } from 'react';
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
  const [backgroundImage, setBackgroundImage] = useState('');

  let backgroundWeather = (id) => {
    if (id >= 200 && id < 300) {
      return 'https://images.unsplash.com/photo-1538169204832-1b461add30a5?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    } else if (id >= 300 && id < 600) {
      return 'https://images.unsplash.com/photo-1514277264166-8dc31e12b509?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    } else if (id >= 600 && id < 700) {
      return 'https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    } else if (id >= 700 && id < 800) {
      return 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&q=80&w=2428&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    } else if (id > 800 ) {
      return 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    return 'https://images.unsplash.com/photo-1545193544-312983719627?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  
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
    setBackgroundImage(backgroundWeather(data.weather[0].id));
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
    setBackgroundImage(backgroundWeather(weatherData.weather[0].id));

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
        backgroundImage={backgroundImage}
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
