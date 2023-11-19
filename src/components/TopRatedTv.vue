<template>
    <div class="container mb-5">
        <h2 class="text-light display-5 fw-bold mb-3" v-if="store.bestMovies">Le serie TV più votate</h2>
        <h2 class="text-light display-5 fw-bold mb-3" v-else>Serie TV</h2>
        <div class="d-flex justify-content-center align-items-center right-arrow" @click="scrollRight">
            <i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="d-flex justify-content-center align-items-center left-arrow" @click="scrollLeft">
            <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class="d-flex overflow-hidden" ref="movieScroller">
            <PostersComponent v-for="serie in store.topSeries" @click="getActorsSeries(serie)"
                @dblclick="$emit('playVideos', serie.id)" :name="serie.name" :image="serie.poster_path"
                :original-name="serie.original_name" :rating="serie.vote_average" :language="serie.original_language"
                :overview="serie.overview" :genreids="serie.genre_ids" :cast="serie.cast" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
            actors: []
        }
    },
    methods: {
        getActorsSeries(serie) {
            if (serie.cast && serie.cast.length > 0) {
                this.actors = []
                return
            }
            this.actors = []
            let castArr = []
            axios.get(store.apiUrl + 'tv/' + serie.id + '/credits', { params: store.params }).then((res) => {
                castArr = res.data.cast
            }).finally(() => {
                if (castArr.length > 5) {
                    for (let i = 0; i < 5; i++) {
                        this.actors.push(castArr[i])
                    }
                    serie.cast = this.actors
                } else {
                    for (let c = 0; c < castArr.length; c++) {
                        this.actors.push(castArr[c])
                    }
                    serie.cast = this.actors
                }
                serie.cast = serie.cast.slice(0, 5)

                // console.log(serie.cast)
                // console.log(serie)
            })

        },
        scrollRight() {
            this.$refs.movieScroller.scrollBy({ left: 1320, behavior: 'smooth' })
        },
        scrollLeft() {
            this.$refs.movieScroller.scrollBy({ left: -1320, behavior: 'smooth' })
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 1344px !important;
    position: relative !important;
}

.right-arrow {
    color: rgba($color: #ffffff, $alpha: 0.4);
    font-size: 5vw;
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    height: 150px;
    width: 150px;
    background-color: rgba($color: #000000, $alpha: 0.4);
    border-radius: 50%;
    right: -15%;
    bottom: 30%;

    &:hover {
        color: white;
        background-color: black;
    }
}

.left-arrow {
    color: rgba($color: #ffffff, $alpha: 0.4);
    font-size: 5vw;
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    height: 150px;
    width: 150px;
    background-color: rgba($color: #000000, $alpha: 0.4);
    border-radius: 50%;
    left: -15%;
    bottom: 30%;

    &:hover {
        color: white;
        background-color: black;
    }
}
</style>