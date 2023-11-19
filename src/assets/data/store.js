import { reactive } from 'vue';

export const store = reactive({
    apiUrl: "https://api.themoviedb.org/3/",
    endpoint: {
        movies: "search/movie",
        series: "search/tv",
        popularMovies: "movie/popular",
        popularSeries: "tv/popular",
        genreMovie: 'genre/movie/list',
        genreSeries: 'genre/tv/list',
        discoverMovie: 'discover/movie',
        discoverSeries: 'discover/tv',
        topRatedMovies: 'movie/top_rated',
        topRatedSeries: 'tv/top_rated'
    },
    params: {
        api_key: '79822ad1ecd0e1c275a39196556cb1e3',
        language: 'it-IT'
    },
    movieList: [],
    seriesList: [],
    error: '',
    loading: true,
    imgUrl: 'https://image.tmdb.org/t/p/w342',
    supportedFlags: ['de', 'en', 'es', 'fr', 'it', 'ja'],
    genreMovieList: [],
    genreSeriesList: [],
    bestMovies: false,
    genreList: [],
    videoOn: false,
    topMovies: [],
    topSeries: [],
    popularMovies: [],
    popularSeries: []
})