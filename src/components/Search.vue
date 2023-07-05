<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
      type="search"
      class="search-input"
      placeholder="Input Movie"
      v-model="searchMovie"
    />
  </form>
  <Movie v-for="movie in searchStore.movies" :movie="movie" :searched-movie="true" :key="movie.id"/>
</template>

<script setup>
import { useSearchStore } from "../stores/searchStore";
import Movie from "../components/Movie.vue";
import { ref, watch } from "vue";

let searchStore = useSearchStore()
let searchMovie = ref("");

watch(searchMovie,()=>{
    searchStore.getMovies(searchMovie.value)
})
</script>

<style lang="scss" scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;
}
</style>
