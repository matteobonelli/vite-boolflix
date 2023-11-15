<template>
    <div class="container">
        <h2>Movies</h2>
        <div class="row">
            <PostersComponent v-for="movie in store.movieList" :title="movie.title" :image="movie.poster_path"
                :original-title="movie.original_title" :language="movie.original_language" :rating="movie.vote_average"
                :overview="movie.overview" />
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store'
import PostersComponent from './PostersComponent.vue';
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