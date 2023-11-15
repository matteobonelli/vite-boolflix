<template>
    <div class="col-12 col-md-4 col-lg-3 mb-5" @mouseover="hover = true" @mouseleave="hover = false">
        <div class="h-100" :class="{ 'd-none': hover }">
            <img v-if="image !== null" :src="store.imgUrl + image" :alt="title || name" class="w-100 h-100">
            <div v-else class="d-flex justify-content-center align-items-center">
                <div>Image not found</div>
            </div>
        </div>
        <div class="bg-black text-light h-100" :class="{ 'd-block': hover, 'd-none': hover === false }">
            <div>
                {{ name || title }}
            </div>
            <div v-if="title !== originalTitle || name !== originalName">
                {{ originalTitle || originalName }}
            </div>
            <div>
                <div v-if="!store.supportedFlags.includes(language)">Flag not available</div>
                <img v-else class="flag" :src="'/images/flag-' + language + '.png'" :alt="language">
            </div>
            <div>
                <i class="fa-solid fa-star" v-for="i in getRating()"></i>
                <i class="fa-regular fa-star" v-for="i in (5 - getRating())"></i>
            </div>
            <p>{{ overview }}</p>
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
            this.vote = Math.ceil(this.rating);
            if (this.vote % 2 === 1) {
                this.vote += 1;
            }
            return this.vote
        }
    }
}
</script>

<style lang="scss" scoped>
.flag {
    width: 30px;
}

.fa-solid.fa-star {
    color: gold;
}
</style>