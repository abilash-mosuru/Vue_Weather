<template>
  <div class="app">
    <h1 class="title">🌦 Weather Now</h1>
    <SearchCity @search="fetchByCity" />
    <WeatherCard v-if="weather" :weather="weather" />
    <button v-if="weather" class="save-btn" @click="save">
      Save Location
    </button>
  </div>
</template>

<script>
import { getWeatherByCity } from "./services/weather.service";
import { saveLocation } from "./services/firebase.service";
import SearchCity from "./components/SearchCity.vue";
import WeatherCard from "./components/WeatherCard.vue";

export default {
  components: { SearchCity, WeatherCard },
  data() {
    return { weather: null };
  },
  methods: {
    fetchByCity(city) {
      if(!city || city.length < 3) return;
      getWeatherByCity(city).subscribe({
        next:res => {
        this.weather = res.data;
        localStorage.setItem("lastCity", city);
      },
        error:err => {
          console.error("Error fetching weather data:", err);
        }
      });
    },
    save() {
      saveLocation(this.weather.name);
    },
  },
  mounted() {
    const city = localStorage.getItem("lastCity");
    if (city) this.fetchByCity(city);
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}

.title {
  color: #fff;
  margin-bottom: 20px;
}

.save-btn {
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 20px;
  border: none;
  background: #38bdf8;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}

.save-btn:hover {
  background: #0ea5e9;
}
</style>

