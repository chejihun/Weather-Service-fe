const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeatherByCurrentLocationApi = async (lat, lon) => {
  const todayWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ko&appid=${API_KEY}&units=metric`
  const sevendaysWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric`
  const [todayWeatherResponse, sevenDaysWeatherResponse] = await Promise.all([
    fetch(todayWeatherApiUrl),
    fetch(sevendaysWeatherApiUrl)
  ]);

  const [todayWeatherData, sevenDaysWeatherData] = await Promise.all([
    todayWeatherResponse.json(),
    sevenDaysWeatherResponse.json()
  ]);  

  return [todayWeatherData, sevenDaysWeatherData]
}

export const getWeatherByCityName = async cityName => {
  const todayWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  const sevendaysWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=7&appid=${API_KEY}&units=metric`;

  const [todayWeatherResponse, sevenDaysWeatherResponse] = await Promise.all([
    fetch(todayWeatherApiUrl),
    fetch(sevendaysWeatherApiUrl)
  ]);

  const [todayWeatherData, sevenDaysWeatherData] = await Promise.all([
    todayWeatherResponse.json(),
    sevenDaysWeatherResponse.json()
  ]);  

  return [todayWeatherData, sevenDaysWeatherData]
}