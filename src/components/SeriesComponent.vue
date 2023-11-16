<template>
    <div class="container">
        <i class="fa-solid fa-chevron-right" @click="scrollRight"></i>
        <i class="fa-solid fa-chevron-left" @click="scrollLeft"></i>
        <h2 class="text-light display-3 fw-bold">TV Series</h2>
        <div class="d-flex overflow-x-hidden">
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
        scrollRight() {
            window.scrollBy({ left: -400, behavior: 'smooth' })
        },
        scrollLeft() {
            window.scrollBy({ left: 400, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 1344px !important;
    position: relative !important;
}

.fa-chevron-right {
    position: absolute;
    top: 47%;
    right: -100px;
    color: white;
    font-size: 5vw;
    width: 100px;
    text-align: center;
    opacity: 0.5;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }

}

.fa-chevron-left {
    position: absolute;
    top: 47%;
    left: -100px;
    color: white;
    font-size: 5vw;
    width: 100px;
    text-align: center;
    opacity: 0.5;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }

}
</style>