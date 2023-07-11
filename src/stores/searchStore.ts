import { defineStore } from "pinia";
import axios from "axios";
import { useMovieStore } from "./movieStore";
import movieObj from "../types/MovieType";
import { ref } from "vue";

export const useSearchStore = defineStore("searchStore", () => {
  const movies = ref<movieObj[]>([]);
  const isLoading = ref(false);
  const url =
    "https:api.themoviedb.org/3/search/movie?api_key=d6dbc1c44a0c08f5c7c468222a0a168c&query=";

  const getMovies = (search: string) => {
    isLoading.value = true;
    setTimeout(() => {
      axios.get(`${url}${search}`).then((res) => {
        movies.value = res.data.results;
        isLoading.value = false;
      });
    }, 1000);
  };

  const addMovieToWatched = (id: number) => {
    const movieStore = useMovieStore();
    let movieIdx = movies.value.findIndex((movie) => movie["id"] == id);
    let movie: movieObj = movies.value[movieIdx];

    movieStore.addMovie({ ...movie, isFavourite: false });
  };

  return {
    movies,
    isLoading,
    getMovies,
    addMovieToWatched,
  };
});
