import './App.css';
import { useEffect, useState } from 'react';
import MyLocation from './page/MyLocation';
import WeatherSevenDay from './page/WeatherSevenDay';
import SearchMenu from './page/SearchMenu';
import { LIGHTNING_BG, RAIN_BG, SNOW_BG, MIST_BG, CLEAR_BG, DEFAULT_BG } from './constants';
import { getWeatherByCityName, getWeatherByCurrentLocationApi } from './api';

function App() {

  const [todayWeather, setTodayWeather] = useState(null)
  const [sevendaysWeather, setSevendaysWeather] = useState(null)
  const bookmark = ['My Location', 'Seongnam-si', 'Seoul', 'New York', 'Tokyo']
  const [cityName, setCityName] = useState('My Location')
 
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BG);
  const [loading, setLoading] = useState(false)

  const backgroundWeather = id => {
    if (id >= 200 && id < 300) {
      return LIGHTNING_BG
    } else if (id >= 300 && id < 600) {
      return RAIN_BG
    } else if (id >= 600 && id < 700) {
      return SNOW_BG
    } else if (id >= 700 && id < 800) {
      return MIST_BG
    } else if (id >= 800) {
      return CLEAR_BG
    }

    return DEFAULT_BG
  }
  
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const closeMenu = () => setIsMenuVisible(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const [resTodayWeather, resSevenDaysWeatherData] = await getWeatherByCurrentLocationApi(lat, lon)
      setTodayWeather(resTodayWeather);
      setBackgroundImage(backgroundWeather(resTodayWeather.weather[0].id));
      setSevendaysWeather(resSevenDaysWeatherData);
    });
  };

  const searchWeather = async cityName => {
    setLoading(true)
    
    const [resTodayWeather, resSevenDaysWeatherData] = await getWeatherByCityName(cityName)

    setLoading(false)
    // 실패 
    if (
      !resTodayWeather?.weather || !resTodayWeather?.wind || 
      !resSevenDaysWeatherData?.city || !resSevenDaysWeatherData?.list
      ) {
      return alert(resTodayWeather.message || resSevenDaysWeatherData.message)
    }

    setTodayWeather(resTodayWeather);
    setSevendaysWeather(resSevenDaysWeatherData);
    setBackgroundImage(backgroundWeather(resTodayWeather.weather[0].id));
  };

  useEffect(() => {
    if (cityName === 'My Location') {
      getCurrentLocation();
      
    } else {
      searchWeather(cityName);
    }
  }, [cityName]);

  return (
    <div className='back-img'
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <MyLocation
        todayWeather={todayWeather}
        searchWeather={searchWeather}
        toggleMenu={toggleMenu}
      />
      {isMenuVisible && 
        <SearchMenu
          bookmark={bookmark}
          setCityName={setCityName}
          searchWeather={searchWeather}
          closeMenu={closeMenu}
          loading={loading}
        />
      }
      <WeatherSevenDay
        todayWeather={todayWeather}
        sevendaysWeather={sevendaysWeather}
        setCityName={setCityName}
      />
    </div>
  )
};

export default App;