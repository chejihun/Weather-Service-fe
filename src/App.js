import './App.css';
import { useEffect } from 'react';

function App() {

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f8c24d1da725479cbb3dfdc91abfb54a`
    const response = await fetch(url)
    const data = await response.json();
    console.log("data", data)
  };

  useEffect(() => {
    getCurrentLocation()
  }, []);

  return (
    <div className="App">



    </div>
  );
}

export default App;
