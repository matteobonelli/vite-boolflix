<template>
    <div class="card-poster" @click="checkClick" :class="{ 'card-hover': !clicked }" @mouseleave="clicked = false">
        <div class="card-inner" :class="{ 'flip-card': clicked }">
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
                    <span class="mb-1" v-for="actor in cast">{{ actor.name }}, </span>
                </div>
                <div class="mb-1">
                    <span class="fw-bold me-1">Genere:</span>
                    <span v-for="genre in getGenreId">{{ genre.name }}, </span>
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
        genreids: Array,
        cast: Array

    },
    data() {
        return {
            store,
            vote: null,
            hover: false,
            actorsList: [],
            genreList: [],
            clicked: false
        }
    },
    methods: {
        checkClick() {
            this.clicked = true
        }
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
        getGenreId() {
            this.genreList = []
            for (let i = 0; i < store.genreList.length; i++) {
                for (let g = 0; g < this.genreids.length; g++) {
                    if (this.genreids[g] === store.genreList[i].id) {
                        this.genreList.push(store.genreList[i])
                    }
                }
            }
            // console.log(this.genreList)
            return this.genreList
        },
    }

}
</script>

<style lang="scss" scoped>
@use '../../assets/styles/partials/variables' as *;

.card-poster {
    background-color: transparent;
    min-width: 330px;
    height: 450px;
    perspective: 1000px;

}

.card-hover:hover {
    cursor: pointer;
    opacity: 0.6;
    border: 10px solid $brand-secondary;
    transition: 0.4s ease;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.flip-card {
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