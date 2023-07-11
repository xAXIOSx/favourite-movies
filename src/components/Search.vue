<template>
  <vue-basic-alert :duration="300" ref="alert"/>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
      type="search"
      class="search-input"
      placeholder="Input Movie"
      v-model="searchMovie"
    />
  </form>
  <Loader v-if="searchStore.isLoading" />
  <h1 style="text-align: center" v-else-if="!searchStore.movies.length">
    Find any movie you want. <br />
    Type the name in input
  </h1>
  <Movie
    v-else
    v-for="movie in searchStore.movies"
    :movie="movie"
    :searched-movie="true"
    :key="movie.id"
    @alertMovie="showError"
  />
</template>

<script setup>
import { useSearchStore } from "../stores/searchStore";
import Movie from "../components/Movie.vue";
import { ref, watch } from "vue";
import VueBasicAlert from 'vue-basic-alert'

const alert = ref(null)

function showError(){
  alert.value.showAlert('error','The film has already been added','Error')
}

let searchStore = useSearchStore();
let searchMovie = ref(localStorage.getItem('searchQuery'));

watch(searchMovie, () => {
  searchStore.getMovies(searchMovie.value);
  console.log(searchMovie.value);
  localStorage.setItem('searchQuery', searchMovie.value)
});

</script>

<style lang="scss" scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;
}
</style>
