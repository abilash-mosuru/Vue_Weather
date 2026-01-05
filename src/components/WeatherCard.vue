<template>
  <div class="weather-card">
    <h2>{{ weather.name }}</h2>
    <div class="temp">{{ weather.main.temp }}°C</div>
    <p class="desc">{{ weather.weather[0].description }}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script>
export default {
  props: ["weather"],
  computed: {
    time() {
      return new Date().toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.weather-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 24px;
  margin-top: 30px;
  color: #fff;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.6s ease;
}

.temp {
  font-size: 56px;
  font-weight: bold;
}

.desc {
  text-transform: capitalize;
  opacity: 0.9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>