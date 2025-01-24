import { useState } from "react";
import { fetchWeatherData } from "./weatherApi";

const WeatherDashboard = () => {
  //state for bringing data into our dashboard when user needs it
  const [city, setCity] = useState<String>("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setError] = useState<string | null>(null);

  return <div>WeatherDashboard</div>;
};

export default WeatherDashboard;
