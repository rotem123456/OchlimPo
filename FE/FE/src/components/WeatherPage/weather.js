import React, { useState } from "react";

const BEpath = "http://localhost:4000";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    console.log("Fetching weather data...");
    try {
      const response = await fetch(`${BEpath}/feature/weather`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      console.log("Response received:", response);
      
      const data = await response.json();
      console.log("Raw weather data:", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => {
          console.log("Button clicked"); // Debug log
          fetchWeather();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Weather
      </button>

      {weatherData ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Current Weather</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          <div className="space-y-2">
            {weatherData.weather && (
              <>
                <p>Temperature: {weatherData.weather.temperature}°C</p>
                <p>Description: {weatherData.weather.description}</p>
                <p>Humidity: {weatherData.weather.humidity}%</p>
                <p>Wind Speed: {weatherData.weather.windSpeed} m/s</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>No weather data yet</div>
      )}
    </div>
  );
};

export default Weather;