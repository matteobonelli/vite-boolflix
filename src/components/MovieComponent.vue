<template>
    <div class="container mb-5">
        <div class="d-flex justify-content-between align-items-center ">
            <div>
                <h2 class="text-light display-3 fw-bold mb-3" v-if="store.bestMovies">Migliori Film</h2>
                <h2 class="text-light display-3 fw-bold mb-3" v-else>Film</h2>
            </div>
        </div>


        <div class="d-flex justify-content-center flex-wrap">
            <PostersComponent v-for="movie in store.movieList" @mouseover="getActorsMovies(movie)" :title="movie.title"
                :image="movie.poster_path" :original-title="movie.original_title" :language="movie.original_language"
                :rating="movie.vote_average" :overview="movie.overview" :movieid="movie.id" :genreids="movie.genre_ids"
                :cast="movie.cast" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { store } from '../assets/data/store'
import PostersComponent from './posters/PostersComponent.vue';
export default {
    name: 'MovieComponent',
    components: {
        PostersComponent
    },
    data() {
        return {
            store,
            picked: '',
            actors: [],
        }
    },
    methods: {
        getActorsMovies(movie) {
            if (movie.cast && movie.cast.length > 0) {
                return
            }
            this.actors = []
            let castArr = []
            axios.get(store.apiUrl + 'movie/' + movie.id + '/credits', { params: store.params }).then((res) => {
                castArr = res.data.cast
            }).finally(() => {
                if (castArr.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        this.actors.push(castArr[i])

                    }
                    movie.cast = this.actors
                } else {
                    for (let c = 0; c < castArr.length; c++) {
                        this.actors.push(castArr[c])
                    }
                    movie.cast = this.actors
                }
                movie.cast = movie.cast.slice(0, 5)

                console.log(movie.cast)
                console.log(movie)
            })

        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 1344px !important;
    position: relative !important;
}
</style>