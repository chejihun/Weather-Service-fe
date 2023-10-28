import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const WeatherSevenDay = ({ weather, dayWeather, setCity }) => {
  const windSpeed = (weather && (weather.wind.speed * 3.6).toFixed(2)) || "0.00";
  
  return (
    <div>
      <Container className='Container-area'>
        <Row className='sub-weather-info'>
          <Col className='weekend'>
            <div className='div-box1'>
              <h2>Weather 7 Days</h2>
              <div className='container-day'>
                {dayWeather && dayWeather.list.slice(0, 7).map((day, index) => {
                  setCity={setCity}
                  const currentDate = new Date();
                  currentDate.setDate(currentDate.getDate() + index);
                  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayName = dayOfWeek;

                  return (
                    <div className='day-item' key={index}>
                      <div className='day-title' >{dayName}</div>
                      <div className='day-temp'>{Math.floor(day.temp.day)}</div>
                      <div className='day-main'>{day.weather[0].main.toUpperCase()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col className='sub-weather-info-data'>
            <div className='div-box2'>
              <h2>Weather Info</h2>
              <div className='container-info'>
                <div className='day-item info-t1'>Cloudy</div>
                <div className='day-item info-t2'>{weather && weather.clouds.all}%</div>
                <div className='day-item info-t1'>Humidity</div>
                <div className='day-item info-t2'>{weather && weather.main.humidity}%</div>
                <div className='day-item info-t1'>Wind</div>
                <div className='day-item info-t2'>{windSpeed}m/s</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default WeatherSevenDay