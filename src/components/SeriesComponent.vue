<template>
    <div class="container mb-5">
        <h2 class="text-light display-3 fw-bold mb-3" v-if="store.bestMovies">Migliori Serie TV</h2>
        <h2 class="text-light display-3 fw-bold mb-3" v-else>Serie TV</h2>
        <div class="d-flex justify-content-center flex-wrap">
            <PostersComponent v-for="serie in store.seriesList" @mouseover="getActorsSeries(serie)" :name="serie.name"
                :image="serie.poster_path" :original-name="serie.original_name" :rating="serie.vote_average"
                :language="serie.original_language" :overview="serie.overview" :genreids="serie.genre_ids"
                :cast="serie.cast" />
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

        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 1344px !important;
    position: relative !important;
}
</style>