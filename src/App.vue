<template>
  <LoadingComponent v-if="loading" />
  <HeaderComponent @search-movie="getQuery" @reload-page="getMainPage" @filter-genre="filterGenres" />
  <main>
    <div v-if="!loading">
      <div class="container d-flex justify-content-center mb-4"
        :class="{ 'd-none': !store.videoOn, 'd-block': store.videoOn }" ref="videoYT">
        <iframe width="1200" height="500" :src="'https://www.youtube.com/embed/' + youtubeKey + '?autoplay=1&mute=1'">
        </iframe>
      </div>
      <section id="movies" class="mt-3" v-if="store.movieList.length > 0">
        <MovieComponent @play-videom="startVideoMovie" />
      </section>
      <section id="series" class="mt-3" v-if="store.seriesList.length > 0">
        <SeriesComponent @play-videos="startVideoSerie" />
      </section>
      <section id="bestmovies" class="mt-3" v-if="store.popularMovies.length > 0">
        <BestMovieComponent @play-videom="startVideoMovie" />
      </section>
      <section id="bestseries" v-if="store.popularSeries.length > 0">
        <BestSeriesComponent @play-videos="startVideoSerie" />
      </section>
      <section id="topMovies" v-if="store.topMovies.length > 0">
        <TopRatedMovies @play-videom="startVideoMovie" />
      </section>
      <section id="topSeries" v-if="store.topSeries.length > 0">
        <TopRatedTv @play-videos="startVideoSerie" />
      </section>
      <div class="nofilm d-flex justify-content-center align-items-center"
        v-if="store.movieList.length === 0 && store.seriesList.length === 0 && store.popularMovies.length === 0">
        <h1 class="text-light">Non sono presenti Film o Serie TV!</h1>
      </div>
    </div>
  </main>
</template>

<script>
import SeriesComponent from './components/SeriesComponent.vue'
import MovieComponent from './components/MovieComponent.vue'
import TopRatedTv from './components/TopRatedTv.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import BestSeriesComponent from './components/BestSeriesComponent.vue'
import BestMovieComponent from './components/BestMovieComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import axios from 'axios'
import { store } from './assets/data/store'
import TopRatedMovies from './components/TopRatedMovies.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    BestMovieComponent,
    BestSeriesComponent,
    LoadingComponent,
    TopRatedMovies,
    TopRatedTv,
    MovieComponent,
    SeriesComponent
  },
  data() {
    return {
      store,
      loading: true,
      youtubeKey: ''
    }
  },
  methods: {
    filterGenres(val) {
      if (val === 'all') {
        this.loading = true
        this.getPopularFilmsAndSeries()
      } else if (val === '') {
        return
      } else {
        store.popularMovies = []
        store.popularSeries = []
        store.topMovies = []
        store.topSeries = []
        store.videoOn = false
        this.youtubeKey = ''
        this.loading = true
        let endpoints = [
          store.apiUrl + store.endpoint.discoverMovie,
          store.apiUrl + store.endpoint.discoverSeries
        ]
        const api_key = '79822ad1ecd0e1c275a39196556cb1e3'
        axios.all(endpoints.map((endpoint) => axios.get(endpoint + '?with_genres=' + val + '&api_key=' + api_key))).then(axios.spread((movieGenres, seriesGenres) => {
          store.movieList = movieGenres.data.results
          store.seriesList = seriesGenres.data.results
        })).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.loading = false
          store.bestMovies = false
        });
      }
    },
    startVideoMovie(id) {

      const url = store.apiUrl + '/movie/' + id + '/videos';
      axios.get(url, { params: store.params }).then((res) => {
        this.youtubeKey = res.data.results[0].key
        console.log(this.youtubeKey)
      }).finally(() => {
        store.videoOn = true;
        this.$refs.videoYT.scrollIntoView({ behavior: "smooth" })
      })

    },
    startVideoSerie(id) {

      const url = store.apiUrl + '/tv/' + id + '/videos';
      axios.get(url, { params: store.params }).then((res) => {
        this.youtubeKey = res.data.results[0].key
        console.log(this.youtubeKey)
      }).finally(() => {
        store.videoOn = true;
        this.$refs.videoYT.scrollIntoView({ behavior: "smooth" })

      })

    },
    getQuery(val) {
      store.popularMovies = []
      store.popularSeries = []
      store.topMovies = []
      store.topSeries = []
      store.videoOn = false
      this.youtubeKey = ''
      this.loading = true
      if (val) {
        store.params.query = val
        // console.log(val)
      } else {
        delete store.params.query
        // console.log('pera')
      }
      this.getMoviesAndSeries()
    },
    getMainPage() {
      store.videoOn = false
      this.youtubeKey = ''
      this.loading = true
      this.getPopularFilmsAndSeries()
    },
    getMoviesAndSeries() {
      store.videoOn = false
      this.youtubeKey = ''
      this.loading = true
      let endpoints = [
        this.store.apiUrl + this.store.endpoint.movies,
        this.store.apiUrl + this.store.endpoint.series,
      ]
      axios.all(endpoints.map((endpoint) => axios.get(endpoint, { params: store.params }))).then(axios.spread((movies, series) => {
        store.movieList = movies.data.results
        store.seriesList = series.data.results
      })).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = false
      });
    },
    getGenresMovies() {
      const movieGenresUrl = this.store.apiUrl + this.store.endpoint.genreMovie;
      const api_key = '79822ad1ecd0e1c275a39196556cb1e3'
      return axios.get(movieGenresUrl + '?api_key=' + api_key)
    },

    getGenresSeries() {
      const seriesGenresUrl = this.store.apiUrl + this.store.endpoint.genreSeries;
      const api_key = '79822ad1ecd0e1c275a39196556cb1e3'
      return axios.get(seriesGenresUrl + '?api_key=' + api_key)
    },

    getGenreList() {
      for (let i = 0; i < store.genreMovieList.length; i++) {
        store.genreList.push(store.genreMovieList[i])
      }
      for (let g = 0; g < store.genreSeriesList.length; g++) {
        for (let c = 0; c < store.genreList.length; c++) {
          if (store.genreSeriesList[g].id === store.genreList[c].id) {
            store.genreSeriesList.splice(g, 1)
          }
        }
      }
      for (let j = 0; j < store.genreSeriesList.length; j++) {
        store.genreList.push(store.genreSeriesList[j])
      }
      // console.log(store.genreList)
    },

    getPopularFilmsAndSeries() {
      store.movieList = []
      store.seriesList = []
      store.videoOn = false
      this.youtubeKey = ''
      let endpoints = [
        store.apiUrl + store.endpoint.popularMovies,
        store.apiUrl + store.endpoint.popularSeries,
        store.apiUrl + store.endpoint.topRatedMovies,
        store.apiUrl + store.endpoint.topRatedSeries,
      ]
      axios.all(endpoints.map((endpoint) => axios.get(endpoint, { params: store.params }))).then(axios.spread((popMovies, popSeries, topMovies, topSeries) => {
        store.popularMovies = popMovies.data.results
        store.popularSeries = popSeries.data.results
        store.topMovies = topMovies.data.results
        store.topSeries = topSeries.data.results
      })).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = true
      });
    }
  },
  mounted() {

  },
  created() {
    this.getPopularFilmsAndSeries()
    Promise.all([this.getGenresMovies(), this.getGenresSeries()]).then((res) => {
      // console.log(res[0].data.genres)
      store.genreMovieList = res[0].data.genres
      store.genreSeriesList = res[1].data.genres
    }).finally(this.getGenreList)

  }
}
</script>

<style lang="scss" scoped>
@use './assets/styles/partials/variables' as *;

main {
  font-family: 'Martel Sans', sans-serif;
  overflow-y: auto;
  height: calc(100vh - 80px);
  background-color: $brand_primary;
  padding: 20px 0;
}

.nofilm {
  height: calc(100vh - 160px);
}

section {
  margin-bottom: 100px;
}
</style>