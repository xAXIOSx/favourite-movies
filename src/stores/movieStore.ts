import { defineStore } from "pinia";
import movieObj from '../types/MovieType'
import { computed, ref } from "vue";

interface State {
  movies: movieObj[],
  activeTab: number
}
type GetMovie = (id:number) => movieObj

// export const useMovieStore = defineStore("movieStore", {
//   state: ():State => ({
//     movies: [],
//     activeTab: 2
//   }),
//   getters: {
//     favouriteMovies():movieObj[]{
//       return this.movies.filter((movie)=>{
//         return movie.isFavourite
//       })
//     },
//     moviesCounts():{[key: string]:number}{
//       return {
//         'all': this.movies.length,
//         'favourite': this.favouriteMovies.length
//       }
//     },
//     getMovie(state):GetMovie {
//       return function(id:number):movieObj{
//         let movieIdx = state.movies.findIndex(movie => movie.id == id)
//         return state.movies[movieIdx]
//       }
//     },
//   },
//   actions: {
//     favouriteToggle(id: number){
//       let movie = this.getMovie(id)
//       let isFavourite = movie.isFavourite
//       console.log(movie);
//       movie.isFavourite = !isFavourite
//     },
//     tabToggle(tab: number){
//       this.activeTab = tab
//     },
//     addMovie(movie:movieObj){
//       this.movies.push(movie)
//     },
//     deleteMovie(id: number){
//       let movieIdx = this.movies.findIndex(movie => movie.id == id)
//       this.movies.splice(movieIdx,1)
//       // let movieIdx = this.movies.findIndex((movie) => movie.id == id)
//     }
//   }
// });

export const useMovieStore = defineStore("movieStore", () => {
  let movies = ref([])
  let activeTab = ref(2)

  const favouriteMovies:movieObj[] = computed(()=>{
    return movies.value.filter((movie:movieObj)=>{
      return movie.isFavourite
    })
  })

  const moviesCounts = computed(()=>{():{[key: string]:number} => {
          return {
            'all': movies.value.length,
            'favourite': favouriteMovies.length
          }
        }})
        const getMovie = (state):GetMovie => {
          return function(id:number):movieObj{
            let movieIdx = state.movies.findIndex(movie => movie.id == id)
            return state.movies[movieIdx]
          }
        }
  
  const favouriteToggle = (id: number) => {
      let movie = getMovie(id)
      let isFavourite = movie.isFavourite
      console.log(movie);
      movie.isFavourite = !isFavourite
  }
    const tabToggle = (tab: number) => {
      activeTab.value = tab
    }
    const addMovie = (movie:movieObj) => {
      movies.value.push(movie)
    }
    const deleteMovie = (id: number) => {
      let movieIdx = movies.value.findIndex(movie => movie.id == id)
      movies.value.splice(movieIdx,1)
    }
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
    }
  }

});