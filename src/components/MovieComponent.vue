<template>
    <div class="container">
        <h2 class="text-light display-3 fw-bold mb-3" v-if="store.bestMovies">Migliori Film</h2>
        <h2 class="text-light display-3 fw-bold mb-3" v-else>Film</h2>
        <div class="d-flex flex-wrap overflow-x-hidden">
            <PostersComponent v-for="movie in store.movieList" :title="movie.title" :image="movie.poster_path"
                :original-title="movie.original_title" :language="movie.original_language" :rating="movie.vote_average"
                :overview="movie.overview" :movieid="movie.id" :genreids="movie.genre_ids" />
        </div>
    </div>
</template>

<script>
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
            picked: ''
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 1344px !important;
    position: relative !important;
}
</style>