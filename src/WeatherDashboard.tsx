import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchWeatherData } from "./weatherApi";

const getWeatherBackgroundStyle = () => {
  return {
    background: "#1A1A58",
    backgroundSize: "cover",
  };
};

const WeatherDashboard = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const weatherStyle = getWeatherBackgroundStyle();

  return (
    <Box
      sx={{
        ...weatherStyle,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#00FFDD",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          textShadow: "0 0 5px #00FFDD, 0 0 10px #00FFDD, 0 0 15px #00FFDD",
        }}
      >
        Weather Dashboard
      </Typography>

      <form
        onSubmit={handleSearch}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextField
          label="Enter city"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{
            marginBottom: "10px",
            input: {
              color: "#fff",
            },
            fieldset: {
              borderColor: "#00FFDD",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: "#4b00b2",
            "&:hover": { backgroundColor: "#7C3AED" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </Button>
      </form>

      {error && (
        <Typography color="error" sx={{ marginTop: "20px", color: "#00FFDD" }}>
          {error}
        </Typography>
      )}

      {weather && !error && (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            marginTop: "20px",
            width: "80%",
            maxWidth: "400px",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography variant="h5" sx={{ color: "#333" }}>
            {weather.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            {weather.weather[0].description}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Temperature: {weather.main.temp}°C
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Humidity: {weather.main.humidity}%
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Wind Speed: {weather.wind.speed} m/s
          </Typography>

          {weather.weather[0].description.includes("clear") && (
            <img
              src="https://img.icons8.com/ios/452/sun.png"
              alt="Sun"
              width={80}
            />
          )}
          {weather.weather[0].description.includes("rain") && (
            <img
              src="https://img.icons8.com/ios/452/rain.png"
              alt="Rain"
              width={80}
            />
          )}
          {weather.weather[0].description.includes("clouds") && (
            <img
              src="https://img.icons8.com/ios/452/cloud.png"
              alt="Clouds"
              width={80}
            />
          )}
          {weather.weather[0].description.includes("snow") && (
            <img
              src="https://img.icons8.com/ios/452/snow.png"
              alt="Snow"
              width={80}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default WeatherDashboard;
