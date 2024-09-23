import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CityContext } from "../context/Citycontext";

function Weather({ city = "London" }) {
  const { selectedCity } = useContext(CityContext); // Get the selected city from context
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Dynamically construct the API URL based on the selected city or default to "London"
  const cityQuery = selectedCity || city;
  const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=e12eb22ba06b49a3ba0125219242009&q=${cityQuery}&aqi=no`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_WEATHER);
        setWeather(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchWeatherData();
  }, [API_WEATHER]); // Re-fetch weather data when the city changes

  if (!weather) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h2>{weather.location.name}</h2>
      <h3>{weather.current.temp_c}°C</h3>
      <p>Condition: {weather.current.condition.text}</p>
    </>
  );
}

export default Weather;
