import axios from "axios";
import { from } from "rxjs";

const API_KEY = "290ffc713af37422b6824e6ced2c6cfa";

export function getWeatherByCity(city) {
  return from(
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    })
  );
}

// 🔥 NEW: City suggestions
export function getCitySuggestions(query) {
  return from(
    axios.get("https://api.openweathermap.org/geo/1.0/direct", {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    })
  );
}