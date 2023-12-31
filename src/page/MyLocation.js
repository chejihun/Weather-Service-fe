
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MyLocation = ({ todayWeather, toggleMenu }) => {

  let formattedDate = "";
  if (todayWeather && todayWeather.dt) {
    const timestamp = todayWeather.dt * 1000;
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    formattedDate = date.toLocaleDateString('en-US', options);
  } else {
    console.error("날짜 데이터를 찾을 수 없습니다.");
  }

  return (
    <div>
      <Container className='Container-area'>
        <Row className='logo-ser-area'>
          <Col className='menu-logo'>the weather</Col>
          <Col className='menu-search'>
            <FontAwesomeIcon icon={faBars} className='fabars'  onClick={toggleMenu} />
          </Col>
        </Row>
        <Row className='main-weather-area'>
          <Col className='main-weather'>
            <h1 className='weather-city-title'>
              {todayWeather && todayWeather.name}</h1>
            <h6 className='today-date'>{formattedDate}
            </h6>
            <div className='now-weather-info'>
              <div className="weather-main">
                <div className='weather-temp'>
                  {todayWeather && Math.floor(todayWeather.main.temp)}
                </div>
                <h6 className='weather-main-status'>
                  {todayWeather && todayWeather.weather[0].description.toUpperCase()}
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyLocation;
