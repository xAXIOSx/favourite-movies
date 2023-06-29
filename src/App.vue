<template>
  <main>
    <header class="header">
      <img src="../public/logo.svg" alt="logo" class="header-logo" />
      <h2>My favourite movies</h2>
    </header>
    <div class="tabs">
      <button :class="['btn', {'btn_green':movieStore.activeTab === 1}]">Favourite</button>
      <button :class="['btn', {'btn_green':movieStore.activeTab === 2}]">Search</button>
    </div>
    <div class="movies" v-if="movieStore.activeTab === 1">
      <h3>All Movies:</h3>
      <Movie
        v-for="movie in movieStore.movies"
        :movie="movie"
        :key="movie.id"
      />
    </div>
    <div class="search" v-else>
      Search
    </div>
  </main>
</template>

<script setup>
import Movie from "./components/Movie.vue";
import { useMovieStore } from "./stores/movieStore";
const movieStore = useMovieStore();

console.log(movieStore);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &-logo {
    max-width: 50px;
    margin-right: 10px;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
