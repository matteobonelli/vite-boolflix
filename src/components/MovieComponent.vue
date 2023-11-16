<template>
    <div class="container">
        <i class="fa-solid fa-chevron-right" @click="scrollRight"></i>
        <i class="fa-solid fa-chevron-left" @click="scrollLeft"></i>
        <h2 class="text-light display-3 fw-bold">Movies</h2>
        <div class="d-flex overflow-x-hidden">
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