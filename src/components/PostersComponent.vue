<template>
    <div class="col-12 col-md-4 col-lg-3 mb-5 card-height" @mouseover="hover = true" @mouseleave="hover = false">
        <div class="h-100" :class="{ 'd-none': hover }">
            <img v-if="image !== null" :src="store.imgUrl + image" :alt="title || name" class="w-100 h-100">
            <div v-else class="d-flex justify-content-center align-items-center h-100">
                <div class="text-light">Image not found</div>
            </div>
        </div>
        <div class="bg-black text-light h-100 overflow-y-auto px-2"
            :class="{ 'd-block': hover, 'd-none': hover === false }">
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
            <div>
                <span class="fw-bold me-2">Voto:</span>
                <i class="fa-solid fa-star" v-for="i in getRating()"></i>
                <i class="fa-regular fa-star" v-for="i in (5 - getRating())"></i>
            </div>
            <div class="mb-4">
                <span class="fw-bold">Trama:</span>
                <p>{{ overview }}</p>
            </div>

        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store'
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
        overview: String
    },
    data() {
        return {
            store,
            vote: null,
            hover: false
        }
    },
    methods: {
        getRating() {
            if (this.rating === 0) {
                return this.vote = 0
            } else if (this.rating > 0 && this.rating <= 2) {
                return this.vote = 1
            } else if (this.rating > 2 && this.rating <= 4) {
                return this.vote = 2
            } else if (this.rating > 4 && this.rating <= 6) {
                return this.vote = 3
            } else if (this.rating > 6 && this.rating <= 8) {
                return this.vote = 4
            } else if (this.rating > 8 && this.rating <= 10) {
                return this.vote = 5
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card-height {
    height: 450px;

    &:hover {
        cursor: pointer;
    }
}

.flag {
    width: 25px;
}

.fa-solid.fa-star {
    color: gold;
}
</style>