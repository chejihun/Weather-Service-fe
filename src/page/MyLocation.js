
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MyLocation = ({ weather }) => {
  console.log("www", weather)
  
  let formattedDate = "";
  if (weather && weather.dt) {
    const timestamp = weather.dt * 1000;
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    formattedDate = date.toLocaleDateString('en-US', options);
  } else {
    console.error("날짜 데이터를 찾을 수 없습니다.");
  }

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
            <h1 className='weather-city-title'>{weather && weather.name}</h1>
            <h6 className='today-date'>{formattedDate}</h6>

            <div className='now-weather-info'>

              <div className="weather-main1">
                <img src='https://cdn-icons-png.flaticon.com/128/3313/3313888.png?ga=GA1.1.1013719647.1649674589&track=ais'
                  className='img-icon' />
                <h6 className='weather-main-status'>{weather && weather.weather[0].main.toUpperCase()}</h6>
              </div>
              <div className="weather-main2" >
              <div className='weather-temp'>{weather && Math.floor(weather.main.temp)}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className='search-menu-area'>
        <div className="search">
          <input type="text" placeholder="검색어 입력" className='ser-bar' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon searchbar-icon' />
        </div>
        <div className='Bookmark'>
          <h2 className='Bookmark-move'>My location</h2>
          <h2 className='Bookmark-move'>Seoul</h2>
          <h2 className='Bookmark-move'>NewYork</h2>
          <h2 className='Bookmark-move'>Tokyo</h2>
          <h2 className='Bookmark-move'></h2>
        </div>

      </div>


    </div>
  );
}

export default MyLocation;
