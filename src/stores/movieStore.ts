import { defineStore } from "pinia";
import movieObj from '../types/MovieType'

interface State {
  movies: movieObj[],
  activeTab: number
}
type GetMovie = (id:number) => movieObj

export const useMovieStore = defineStore("movieStore", {
  state: ():State => ({
    movies: [
      {
        id: 1,
        original_title: "Spider-Man",
        overview:
          "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
        poster_path: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
        release_date: "2002-05-01",
        isWatched: true,
      },
      {
        id: 2,
        original_title: "The Batman",
        overview:
          "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
        poster_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        release_date: "2022-03-01",
        isWatched: false,
      },
    ],
    activeTab: 2
  }),
  getters: {
    watchedMovies():movieObj[]{
      return this.movies.filter((movie)=>{
        return movie.isWatched
      })
    },
    moviesCounts():{[key: string]:number}{
      return {
        'all': this.movies.length,
        'watched': this.watchedMovies.length
      }
    },
    getMovie(state):GetMovie {
      return function(id:number):movieObj{
        let movieIdx = state.movies.findIndex(movie => movie.id == id)
        return state.movies[movieIdx]
      }
    },
  },
  actions: {
    watchToggle(id: number){
      let movie = this.getMovie(id)
      let isWatched = movie.isWatched
      movie.isWatched = !isWatched
    },
    tabToggle(tab: number){
      this.activeTab = tab
    },
    addMovie(movie:movieObj){
      this.movies.push(movie)
    },
    deleteMovie(id: number){
      let movieIdx = this.movies.findIndex(movie => movie.id == id)
      this.movies.splice(movieIdx,1)
      // let movieIdx = this.movies.findIndex((movie) => movie.id == id)
    }
  }
});
