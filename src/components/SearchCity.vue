<template>
  <div class="search-container">
    <input
      v-model="query"
      @input="onInput"
      placeholder="Search city..."
      class="search-input"
    />

    <ul v-if="suggestions.length" class="suggestions">
      <li
        v-for="city in suggestions"
        :key="city.lat + city.lon"
        @click="selectCity(city)"
      >
        {{ city.name }}, {{ city.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getCitySuggestions } from "../services/weather.service";

let timer;

export default {
  data() {
    return {
      query: "",
      suggestions: [],
    };
  },
  methods: {
    onInput() {
      clearTimeout(timer);

      if (this.query.length < 3) {
        this.suggestions = [];
        return;
      }

      timer = setTimeout(() => {
        getCitySuggestions(this.query).subscribe({
          next: (res) => (this.suggestions = res.data),
          error: () => (this.suggestions = []),
        });
      }, 500); // debounce
    },
    selectCity(city) {
      this.query = `${city.name}`;
      this.suggestions = [];
      this.$emit("search", city.name);
    },
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  max-width: 320px;
  margin: auto;
}

.search-input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  outline: none;
}

.suggestions {
  position: absolute;
  width: 100%;
  background: #1e293b;
  border-radius: 10px;
  margin-top: 6px;
  list-style: none;
  padding: 0;
  overflow: hidden;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.suggestions li:hover {
  background: #334155;
}
</style>