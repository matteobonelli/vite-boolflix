<template>
  <HeaderComponent @search-movie="getQuery" />
  <main>
    <section id="movies">
      <MovieComponent />
    </section>
    <section id="series">
      <SeriesComponent />
    </section>
  </main>
</template>

<script>
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
    SeriesComponent
  },
  data() {
    return {
      store,
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
      })
    },
  },
  created() {
    this.getMoviesAndSeries();
  }
}
</script>

<style lang="scss" scoped></style>