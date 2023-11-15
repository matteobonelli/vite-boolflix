<template>
    <div class="container">
        <h2>TV Series</h2>
        <div class="row">
            <PostersComponent v-for="serie in store.seriesList" :name="serie.name" :image="serie.poster_path"
                :original-name="serie.original_name" :rating="serie.vote_average" :language="serie.original_language"
                :overview="serie.overview" />
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store'
import PostersComponent from './PostersComponent.vue';
export default {
    name: 'SeriesComponent',
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