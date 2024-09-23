import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CityContext } from "../context/Citycontext";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

function Weather({ city = "London" }) {
  const { selectedCity } = useContext(CityContext); // Get the selected city from context
  const [weather, setWeather] = useState<WeatherData | null>(null); // Define weather state with the correct type
  const [error, setError] = useState<Error | null>(null);

  // Dynamically construct the API URL based on the selected city or default to "London"
  const cityQuery = selectedCity || city;
  const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=e12eb22ba06b49a3ba0125219242009&q=${cityQuery}&aqi=no`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(API_WEATHER); // Specify the type of data returned
        setWeather(response.data);
      } catch (err) {
        setError(err as Error); // Cast error to Error type
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
