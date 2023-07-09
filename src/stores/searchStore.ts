import { defineStore } from "pinia";
import axios from "axios";
import { useMovieStore } from "./movieStore";
import movieObj from "../types/MovieType";

const url =
  "https:api.themoviedb.org/3/search/movie?api_key=d6dbc1c44a0c08f5c7c468222a0a168c&query=";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    movies: [],
    isLoading: false,
  }),
  actions: {
    getMovies(search: string) {
      this.isLoading = true;
      setTimeout(() => {
        axios.get(`${url}${search}`).then((res) => {
          this.movies = res.data.results;
          this.isLoading = false;
        });
      }, 1000);
    },
    addMovieToWatched(id: number) {
      const movieStore = useMovieStore();
      let movieIdx = this.movies.findIndex((movie) => movie["id"] == id);
      let movie: movieObj = this.movies[movieIdx];

      movieStore.addMovie({ ...movie, isFavourite: false });
    },
  },
});
