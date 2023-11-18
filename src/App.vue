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
      <section id="movies" class="mb-4" v-if="store.movieList.length > 0">
        <MovieComponent @play-videom="startVideoMovie" />
      </section>
      <section id="series" v-if="store.seriesList.length > 0">
        <SeriesComponent @play-videos="startVideoSerie" />
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
        store.videoOn = false
        this.youtubeKey = ''
        this.loading = true
        const url = store.apiUrl + store.endpoint.discoverMovie
        const url2 = store.apiUrl + store.endpoint.discoverSeries
        const api_key = '79822ad1ecd0e1c275a39196556cb1e3'
        axios.get(url + '?with_genres=' + val + '&api_key=' + api_key).then((res) => {
          this.store.movieList = res.data.results
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.loading = false
          store.bestMovies = false
        });
        axios.get(url2 + '?with_genres=' + val + '&api_key=' + api_key).then((res) => {
          this.store.seriesList = res.data.results
        }).catch((error) => {
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
      const movieurl = this.store.apiUrl + this.store.endpoint.movies;
      axios.get(movieurl, { params: this.store.params }).then((res) => {
        // console.log(res.data.results)
        this.store.movieList = res.data.results
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = false
      });
      this.loading = true
      const seriesurl = this.store.apiUrl + this.store.endpoint.series;
      axios.get(seriesurl, { params: this.store.params }).then((res) => {
        // console.log(res.data.results)
        this.store.seriesList = res.data.results
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = false
      });
    },
    getGenresMovies() {
      const movieGenresUrl = this.store.apiUrl + this.store.endpoint.genreMovie;
      return axios.get(movieGenresUrl, { params: this.store.apiParam })
    },

    getGenresSeries() {
      const seriesGenresUrl = this.store.apiUrl + this.store.endpoint.genreSeries;
      return axios.get(seriesGenresUrl, { params: this.store.apiParam })
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
      store.videoOn = false
      this.youtubeKey = ''
      const url = store.apiUrl + store.endpoint.popularMovies
      const url2 = store.apiUrl + store.endpoint.popularSeries
      axios.get(url, { params: store.params }).then((res) => {
        this.store.movieList = res.data.results
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
        store.bestMovies = true
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