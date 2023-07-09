<template>
  <main>
    <header class="header">
      <img src="../public/logo.svg" alt="logo" class="header-logo" />
      <h2>My favourite movies</h2>
    </header>
    <div class="tabs">
      <button @click="movieStore.tabToggle(1)" :class="['btn', { btn_green: movieStore.activeTab === 1 }]">
        My Movies
      </button>
      <button @click="movieStore.tabToggle(2)" :class="['btn', { btn_green: movieStore.activeTab === 2 }]">
        Search
      </button>
    </div>
    <div class="movies" v-if="movieStore.activeTab === 1">
      <div class="movies-all">
        <h3>Watched Movies:  ({{ movieStore.moviesCounts.all }})</h3>
        <Movie
          v-for="movie in movieStore.movies"
          :movie="movie"
          :key="movie.id"
        />
      </div>
      <TransitionGroup class="movies-watched" name="fav-list" tag="div">
        <h3><span class="gold-text">Favourite</span> Movies: ({{ movieStore.moviesCounts.favourite }})</h3>
        <Movie
          v-for="movie in movieStore.favouriteMovies"
          :movie="movie"
          :key="movie.id"
        />
      </TransitionGroup>
    </div>
    <div class="search" v-else>
      <Search/>
    </div>
  </main>
</template>

<script setup>
import Movie from "./components/Movie.vue";
import Search from "./components/Search.vue"
import { useMovieStore } from "./stores/movieStore";
const movieStore = useMovieStore();
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

.fav-list-enter-active,
.fav-list-leave-active {
  transition: all 0.5s ease;
}
.fav-list-enter-from,
.fav-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
