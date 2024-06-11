import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { CardBody, CardSubtitle, CardText } from 'react-bootstrap';

function App() {

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState([]);

  useEffect(() => getLocation(),[city]);

  return (
    <>
      <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <body>
        <Container className="mainContainer">
          <br /><br /><br /><br />
          <Row className="rowHeader">{city}</Row>
          <Row className="rowHeader">{weather.datetime}</Row>
          <Row>
          <Col className="leftCol">
            <Card className="leftCard">
              <CardBody className="cardBody">
                <CardText className="cardText">
                  Precipitation: {weather.precip}mm<br/>
                  Precipitation Chance: {weather.precipprob}%<br/>
                  Precipitation Type: {weather.preciptype == null ? "N/A" : weather.preciptype}<br/>
                  Snow: {weather.snow}cm<br/>
                  Snow Depth: {weather.snowdepth}cm
                </CardText>
              </CardBody>
            </Card>
            <br />
            <Card className="leftCard">
              <CardBody className="cardBody">
                <CardText className="cardText">
                  Humidity: {weather.humidity}% <br />
                  Dew Point: {weather.dew}&deg;C
                  
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="midCol">
            <Card className="midCard">
              <Card.Img variant="top" src={`/Icons/${weather.icon}.png`} className="midImg"></Card.Img>
              <CardBody className="cardBody">
                <CardText className="cardText">
                  <CardText style={{fontSize: "20px"}}>
                    {weather.conditions}<br />
                    {weather.temp}&deg;C<br />
                  </CardText>
                  Feels Like: {weather.feelslike}&deg;C<br />
                  Icon: {weather.icon}<br />
                  UV Index: {weather.uvindex}<br />
                  Cloud Cover: {weather.cloudcover}%<br />
                  Visibility: {weather.visibility} miles
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="rightCol">
          <Card className="rightCard">
              <CardBody className="cardBody">
                <CardText className="cardText">
                  Wind Direction: {windDirection(weather.winddir)}<br />
                  Wind Gust: {weather.windgust}mph<br />
                  Wind Speed: {weather.windspeed}mph<br />
                  Pressure: {weather.pressure}mb
                </CardText>
              </CardBody>
            </Card>
            <br />
            <Card className="rightCard">
              <CardBody className="cardBody">
                <CardText className="cardText">
                  Sunrise: {weather.sunrise}<br />
                  Sunset: {weather.sunset}<br />
                  Moon Phase: {weather.moonphase}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          </Row>
        </Container>
      </body>
    </>
  );





function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then((res) => res.json()).then((data) =>
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.city}?unitGroup=metric&key=GBEPU93ZW6U272C5NLSD6QLBM&contentType=json`).then((data) => data.json()).then((data) => {
    setCity(data.address);
    setWeather(data.currentConditions);
    console.log(weather);
    }
));
  
}

function windDirection(direction) {
  if(direction <= 22.5) return "N";
  else if(direction <= 67.5) return "NE";
  else if(direction <= 112.5) return "E";
  else if(direction <= 157.5) return "SE";
  else if(direction <= 202.5) return "S";
  else if(direction <= 247.5) return "SW";
  else if(direction <= 292.5) return "W";
  else if(direction <= 337.5) return "NW";
  else return "N";
}





}

export default App;
