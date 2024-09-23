import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CityContext } from "../context/Citycontext";
import Dropdown from "./Dropdown";

function Forecast({ city = "London", days = 1 }) {
  const { selectedCity } = useContext(CityContext); // Get the selected city from context
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Dynamically construct the API URL based on the selected city or the default city
  const cityQuery = selectedCity || city;
  const API_FORECAST = `http://api.weatherapi.com/v1/forecast.json?key=e12eb22ba06b49a3ba0125219242009&q=${cityQuery}&days=${days}&aqi=no&alerts=no`;

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(API_FORECAST);
        setForecast(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchForecastData();
  }, [API_FORECAST]); // Refetch data when the city changes

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!forecast) {
    return <div>Loading...</div>;
  }

  if (days == 1) {
    return (
      <div>
        <Dropdown />

        {forecast && (
          <div style={{ marginTop: "20px" }}>
            <img src={forecast.current.condition.icon} alt="Weather Icon" />
            <h2>{forecast.current.condition.text}</h2>
            <p>Temperature: {forecast.current.temp_c}°C</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        {forecast &&
          forecast.forecast &&
          forecast.forecast.forecastday &&
          forecast.forecast.forecastday
            .slice(0, 7)
            .map((dayForecast, index) => {
              // Convert date into day of the week
              const dayOfWeek = new Date(dayForecast.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                }
              );

              return (
                <div key={index} style={{ marginTop: "20px", padding: "10px" }}>
                  <h3>{dayOfWeek}</h3> {/* Display day of the week */}
                  <img
                    src={dayForecast.day.condition.icon}
                    alt="Weather Icon"
                  />
                  <h2>{dayForecast.day.condition.text}</h2>
                  <p>Max: {dayForecast.day.maxtemp_c}°C</p>
                  <p>Min: {dayForecast.day.mintemp_c}°C</p>
                </div>
              );
            })}
      </div>
    );
  }
}

export default Forecast;
