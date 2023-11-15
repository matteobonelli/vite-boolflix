import { reactive } from 'vue';

export const store = reactive({
    apiUrl: "https://api.themoviedb.org/3/",
    endpoint: {
        movies: "search/movie",
        series: "search/tv",
    },
    params: {
        api_key: '79822ad1ecd0e1c275a39196556cb1e3',
    },

    movieList: [],
    seriesList: [],
    error: '',
    loading: true,
    imgUrl: 'https://image.tmdb.org/t/p/w342'

})