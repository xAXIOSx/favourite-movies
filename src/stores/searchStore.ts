import { defineStore } from "pinia";
import axios from "axios";
import { useMovieStore } from "./movieStore";
import movieObj from '../types/MovieType'

type GetMovie = (id:number) => movieObj

const movieStore = useMovieStore();

const url =
  "https:api.themoviedb.org/3/search/movie?api_key=d6dbc1c44a0c08f5c7c468222a0a168c&query=";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    movies: [],
    isLoading: false,
  }),
  getters: {
    getMovie(state):GetMovie {
        return function(id:number):movieObj{
          let movieIdx = state.movies.findIndex(movie => movie.id == id)
          return state.movies[movieIdx]
        }
    },
  },
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
    addMovie(id:number){
        let movie = this.getMovie(id)
        movieStore.addMovie(movie)
    }
  },
});
