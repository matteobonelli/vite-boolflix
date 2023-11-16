<template>
  <LoadingComponent v-if="loading" />
  <HeaderComponent @search-movie="getQuery" @reload-page="getMainPage" />
  <main>
    <div v-if="!loading">
      <section id="movies" class="mb-4" v-if="store.movieList.length > 0">
        <MovieComponent />
      </section>
      <section id="series" v-if="store.seriesList.length > 0">
        <SeriesComponent />
      </section>
      <div class="nofilm d-flex justify-content-center align-items-center"
        v-if="store.movieList.length === 0 && store.seriesList.length === 0">
        <h1 class="text-light">Non sono presenti Film o Serie TV!</h1>
      </div>
    </div>
  </main>
</template>

<script>
import LoadingComponent from './components/LoadingComponent.vue'
import SeriesComponent from './components/SeriesComponent.vue'
import MovieComponent from './components/MovieComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import axios from 'axios'
import { store } from './assets/data/store'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    MovieComponent,
    SeriesComponent,
    LoadingComponent
  },
  data() {
    return {
      store,
      loading: true
    }
  },
  methods: {
    getQuery(val) {
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
      this.getPopularFilmsAndSeries()
    },
    getMoviesAndSeries() {
      const movieurl = this.store.apiUrl + this.store.endpoint.movies;
      axios.get(movieurl, { params: this.store.params }).then((res) => {
        console.log(res.data.results)
        this.store.movieList = res.data.results
      });
      const seriesurl = this.store.apiUrl + this.store.endpoint.series;
      axios.get(seriesurl, { params: this.store.params }).then((res) => {
        console.log(res.data.results)
        this.store.seriesList = res.data.results
      });
    },
    getGenres() {
      const movieGenresUrl = this.store.apiUrl + this.store.endpoint.genreMovie;
      axios.get(movieGenresUrl, { params: this.store.apiParam }).then((res) => {
        this.store.genreMovieList = res.data.genres
        console.log(this.store.genreMovieList)
      });
      const seriesGenresUrl = this.store.apiUrl + this.store.endpoint.genreSeries;
      axios.get(seriesGenresUrl, { params: this.store.apiParam }).then((res) => {
        this.store.genreSeriesList = res.data.genres
        console.log(this.store.genreSeriesList)
      });
    },
    getPopularFilmsAndSeries() {
      const url = store.apiUrl + store.endpoint.popularMovies
      const url2 = store.apiUrl + store.endpoint.popularSeries
      axios.get(url, { params: store.params }).then((res) => {
        this.store.movieList = res.data.results
      });
      axios.get(url2, { params: store.params }).then((res) => {
        this.store.seriesList = res.data.results
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = true
      });
    }
  },
  created() {
    this.getPopularFilmsAndSeries()
    this.getGenres();

  }
}
</script>

<style lang="scss" scoped>
@use './assets/styles/partials/variables' as *;

main {
  overflow-y: auto;
  height: calc(100vh - 80px);
  background-color: $brand_primary;
  padding: 20px 0;
}

.nofilm {
  height: calc(100vh - 160px);
  ;
}
</style>