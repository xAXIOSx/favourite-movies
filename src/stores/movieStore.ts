import { defineStore } from "pinia";
import movieObj from "../types/MovieType";
import { computed, ref } from "vue";


export const useMovieStore = defineStore("movieStore", () => {
  let movies = ref<movieObj[]>([]);
  let activeTab = ref(2);

  const favouriteMovies = computed((): movieObj[] => {
    return movies.value.filter((movie: movieObj) => {
      return movie.isFavourite;
    });
  });

  const moviesCounts = computed((): { [key: string]: number } => {
    return {
      all: movies.value.length,
      favourite: favouriteMovies.value.length,
    };
  });

  const getMovie = (id: number) => {
      let movieIdx = movies.value.findIndex((movie) => movie.id == id);
      return movies.value[movieIdx];
  };

  const favouriteToggle = (id: number) => {
    let movie:movieObj = getMovie(id);
    let isFavourite = movie.isFavourite;
    movie.isFavourite = !isFavourite;
  };

  const tabToggle = (tab: number) => {
    activeTab.value = tab;
  };

  const addMovie = (movie: movieObj) => {
    movies.value.push(movie);
  };

  const deleteMovie = (id: number) => {
    let movieIdx = movies.value.findIndex((movie) => movie.id == id);
    movies.value.splice(movieIdx, 1);
  };

  return {
    movies,
    activeTab,
    favouriteMovies,
    moviesCounts,
    getMovie,
    favouriteToggle,
    tabToggle,
    addMovie,
    deleteMovie,
  };
});
