import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const WeatherSevenDay = ({weather}) => {
  const windSpeed = (weather && (weather.wind.speed * 3.6).toFixed(2)) || "0.00";
  return (
    <div>
      <Container className='Container-area'>
      <Row className='sub-weather-info'>
          <Col className='weekend'>
            <div className='div-box1'>
              <h2>Weather 7 Days</h2>
              <div className='container-day'>
                <div className='day-item color1'>Item1</div>
                <div className='day-item color2'>Item2</div>
                <div className='day-item color3'>Item3</div>
                <div className='day-item color4'>Item4</div>
                <div className='day-item color5'>Item5</div>
                <div className='day-item color6'>Item6</div>
                <div className='day-item color7'>Item7</div>
              </div>
            </div>
          </Col>
          <Col className='sub-weather-info-data'>
            <div className='div-box2'>
              <h2>Weather Info</h2>
              <div className='container-info'>
                <div className='day-item color1 info-t1'>Item1</div>
                <div className='day-item color2 info-t2'>Item2</div>
                <div className='day-item color3 info-t1'>습도</div>
                <div className='day-item color4 info-t2'>{weather && weather.main.humidity}</div>
                <div className='day-item color5 info-t1'>바람</div>
                <div className='day-item color6 info-t2'>{windSpeed}m/s</div>
              </div>
            </div>
          </Col>
        </Row>
        </Container>
    </div>
  )
}

export default WeatherSevenDay