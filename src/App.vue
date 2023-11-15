<template>
  <div>

    <main>

      <section id="movies">
      </section>
      <section id="series">
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { store } from './assets/data/store'
export default {
  name: 'App',
  data() {
    return {
      store,
    }
  },
  methods: {
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