<template>
    <div class="container">
        <h2 class="text-light display-3 fw-bold mb-3" v-if="store.bestMovies">Migliori Serie TV</h2>
        <h2 class="text-light display-3 fw-bold mb-3" v-else>Serie TV</h2>
        <div class="d-flex overflow-x-hidden flex-wrap">
            <PostersComponent v-for="serie in store.seriesList" :name="serie.name" :image="serie.poster_path"
                :original-name="serie.original_name" :rating="serie.vote_average" :language="serie.original_language"
                :overview="serie.overview" :serieid="serie.id" :genreids="serie.genre_ids" />
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store'
import PostersComponent from './posters/PostersComponent.vue';
export default {
    name: 'SeriesComponent',
    components: {
        PostersComponent
    },
    data() {
        return {
            store,
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