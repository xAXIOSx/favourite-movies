import {defineStore} from 'pinia'
import axios from 'axios'

const url = "https:api.themoviedb.org/3/search/movie?api_key=d6dbc1c44a0c08f5c7c468222a0a168c&query=";


export const useSearchStore = defineStore('searchStore',{
    state:() => ({
        movies:[]
    }),
    actions: {
        async getMovies(search:string){
            axios.get(`${url}${search}`)
                .then((res)=>{
                    this.movies = res.data.results
                    console.log(res.data.results);
                    
                })
        }
    }
})