import axios from "axios";

//We need a function to help us fetch weather data from OpenWeatherMap API

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
