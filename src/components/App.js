import axios from "axios";
import React, { useState } from "react";

const API_KEY = "e260aded38c48a318c5d58d8e50f90a5";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
        )
        .then((response) => {
          setWeather(response.data);
          setQuery("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;

  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />
      {weather && (
        <div className="weather">
          <div className="city">{weather.name}</div>
          <div className="temperature">
            {Math.round(kelvinToFahrenheit(weather.main.temp))}°F
          </div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
