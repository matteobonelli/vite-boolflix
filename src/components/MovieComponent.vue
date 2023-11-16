<template>
    <div class="container">
        <h2 class="text-light display-3 fw-bold">Movies</h2>
        <div class="row">
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
        }
    }
}
</script>

<style lang="scss" scoped></style>