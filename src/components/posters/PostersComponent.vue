<template>
    <div class="mb-5 card-poster" @mouseover="hover = true" @mouseleave="hover = false">
        <div class="card-inner">
            <div class="h-100 card-front">
                <img v-if="image !== null" :src="store.imgUrl + image" :alt="title || name" class="w-100 h-100">
                <div v-else class="d-flex justify-content-center align-items-center h-100">
                    <div class="text-light">Image not found</div>
                </div>
            </div>
            <div class="bg-black text-light h-100 overflow-y-auto px-2 card-back">
                <div class="mt-4 mb-1">
                    <span class="fw-bold">Titolo:</span> {{ name || title }}
                </div>
                <div class="mb-1" v-if="title !== originalTitle || name !== originalName">
                    <span class="fw-bold">Titolo Originale:</span> {{ originalTitle || originalName }}
                </div>
                <div class="mb-1">
                    <span class="fw-bold">Lingua:</span>
                    <span class="mx-2" v-if="!store.supportedFlags.includes(language)">Flag not available</span>
                    <span v-else class="mx-2">
                        <img class="flag" :src="'/images/flag-' + language + '.png'" :alt="language">
                    </span>

                </div>
                <div class="mb-1">
                    <span class="fw-bold me-2">Voto:</span>
                    <i class="fa-solid fa-star" v-for="i in getRating"></i>
                    <i class="fa-regular fa-star" v-for="i in (5 - getRating)"></i>
                </div>
                <div class="mb-1">
                    <span class="fw-bold me-2">Attori:</span>
                    <span v-if="movieid" v-for="actor in getActorsMovies.slice(0, 5)">{{ actor.name }}, </span>
                    <span v-if="serieid" v-for="actor in getActorsSeries.slice(0, 5)">{{ actor.name }}, </span>
                </div>
                <div class="mb-1">
                    <span class="fw-bold me-1">Genere:</span>
                    <span v-for="genre in getGenreMovies" v-if="movieid">{{ genre.name }}, </span><span
                        v-for="genre in getGenreSeries" v-if="serieid">{{ genre.name }}, </span>
                </div>
                <div class="mb-4">
                    <span class="fw-bold">Trama:</span>
                    <p>{{ overview }}</p>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { store } from '../../assets/data/store'
export default {
    name: 'PostersComponent',
    props: {
        name: String,
        title: String,
        image: String,
        originalTitle: String,
        originalName: String,
        language: String,
        rating: Number,
        overview: String,
        serieid: Number,
        movieid: Number,
        genreids: Array

    },
    data() {
        return {
            store,
            vote: null,
            hover: false,
            actorsList: [],
            genreList: []
        }
    },
    methods: {


    },
    created() {

    },
    computed: {
        getRating() {
            this.vote = Math.ceil(this.rating);
            if (this.vote % 2 === 1) {
                this.vote += 1;
            }
            return this.vote / 2
        },
        getActorsMovies() {
            if (this.movieid) {
                axios.get(store.apiUrl + 'movie/' + this.movieid + '/credits', { params: store.params }).then((res) => {
                    this.actorsList = res.data.cast
                })
            }
            return this.actorsList
        },
        getActorsSeries() {
            if (this.serieid) {
                axios.get(store.apiUrl + 'tv/' + this.serieid + '/credits', { params: store.params }).then((res) => {
                    this.actorsList = res.data.cast
                })
            }
            return this.actorsList
        },
        getGenreMovies() {
            this.genreList = []
            for (let i = 0; i < store.genreMovieList.length; i++) {
                for (let g = 0; g < this.genreids.length; g++) {
                    if (this.genreids[g] === store.genreMovieList[i].id) {
                        this.genreList.push(store.genreMovieList[i])
                    }
                }
            }
            return this.genreList
        },
        getGenreSeries() {
            this.genreList = []
            for (let i = 0; i < store.genreSeriesList.length; i++) {
                for (let g = 0; g < this.genreids.length; g++) {
                    if (this.genreids[g] === store.genreSeriesList[i].id) {
                        this.genreList.push(store.genreSeriesList[i])
                    }
                }
            }
            return this.genreList
        }
    }

}
</script>

<style lang="scss" scoped>
.card-poster {
    background-color: transparent;
    min-width: 330px;
    height: 450px;
    perspective: 1000px;

    &:hover {
        cursor: pointer;
    }
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.card-poster:hover .card-inner {
    transform: rotateY(180deg);
}

.card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
}

.flag {
    width: 25px;
}

.fa-solid.fa-star {
    color: gold;
}
</style>