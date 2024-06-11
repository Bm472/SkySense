import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

function App() {

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState([]);

  useEffect(() => getLocation(),[city]);

  return (
    <>
      <header className="App-header">
        {city}
        <div>Cloud Cover: {weather.cloudcover}</div>
        <div>Conditions: {weather.conditions}</div>
        <div>Date/Time: {weather.datetime}</div>
        <div>Dew: {weather.dew}</div>
        <div>Feels Like: {weather.feelslike}C</div>
        <div>Humidity: {weather.humidity}</div>
        <div>Icon: {weather.icon}</div>
        <div>Moon Phase: {weather.moonphase}</div>
        <div>Precipitation: {weather.precip}</div>
        <div>Precipitation Chance: {weather.precipprob}%</div>
        <div>Precipitation Type: {weather.preciptype}</div>
        <div>Pressure: {weather.pressure}</div>
        <div>Snow: {weather.snow}</div>
        <div>Snow Depth: {weather.snowdepth}</div>
        <div>Sunrise: {weather.sunrise}</div>
        <div>Sunset: {weather.sunset}</div>
        <div>Temperature: {weather.temp}</div>
        <div>UV Index: {weather.uvindex}</div>
        <div>Visibility: {weather.visibility}</div>
        <div>Wind Direction: {weather.winddir}</div>
        <div>Wind Gust: {weather.windgust}</div>
        <div>Wind Speed: {weather.windspeed}</div>
      </header>
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





}

export default App;
