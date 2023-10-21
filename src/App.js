import './App.css';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`
    // const response = await fetch(url)
    // const data = await response.json();
    // console.log("data", data)
  };

  useEffect(() => {
    getCurrentLocation()
  }, []);

  return (
    <div className="App">
      <Container className='Container-area'>
        <Row className='logo-ser-area'>
          <Col className='menu-logo'>the weather</Col>
          
          <Col className='menu-search'>
            <FontAwesomeIcon icon={faBars} className='fabars' />
          </Col>

        </Row>
        <Row className='main-weather-area'>
          <Col className='main-weather'>
            <h1 className='weather-city-title'>
              <span>
                <FontAwesomeIcon icon={faLocationCrosshairs} className='location-icon' />
              </span>
              Seongnam-si
            </h1>
            <h6 className='today-date'>October 20, 2023</h6>
            
            <div className='now-weather-info'>
              <div className="weather-main">

                <img src='https://cdn-icons-png.flaticon.com/128/3313/3313888.png?ga=GA1.1.1013719647.1649674589&track=ais'
                className='img-icon'/>

                <h6 className='weather-main-status'>LIGHT RAIN</h6>
              </div>   
              <div>
                <div className='weather-temp'>20</div>
              </div>
            </div>
          </Col>
        </Row>
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
                <div className='day-item color3 info-t1'>Item3</div>
                <div className='day-item color4 info-t2'>Item4</div>
                <div className='day-item color5 info-t1'>Item5</div>
                <div className='day-item color6 info-t2'>Item6</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className='search-menu-area'>
      <div class="search">
        <input type="text" placeholder="검색어 입력" className='ser-bar'/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon searchbar-icon' />
      </div>
      <div className='Bookmark'>
        <h2 className='Bookmark-move'>seoul</h2>
        <h2 className='Bookmark-move'>NewYork</h2>
        <h2 className='Bookmark-move'>Tokyo</h2>
        <h2 className='Bookmark-move'>Paris</h2>
      </div>

      </div>


    </div>
  );
}

export default App;
