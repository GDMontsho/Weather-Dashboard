import { useState } from "react";
import { fetchWeatherData } from "./weatherApi";

const WeatherDashboard = () => {
  //state for bringing data into our dashboard when user needs it
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //function for user form submission
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/*Dashboard header*/}
      <h1>WeatherDashboard</h1>
      {/*form for submiting user searches*/}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {weather && !error && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
