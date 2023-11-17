<template>
    <div class="d-flex justify-content-between align-items-center bg-background">
        <img src="images/netflix-logo.png" alt="neflix logo" @click="$emit('reloadPage')">
        <div class="d-flex align-items-center">
            <select name="genres" id="genres" @change="filterGenre" v-model="genreSelected">
                <option value="">All</option>
                <option v-for="genre in store.genreList" :value="genre.id" :key="genre.id">{{ genre.name }}</option>
            </select>
            <input type="text" class="form-control" placeholder="Cerca il tuo film preferito!" v-model="search"
                @keyup.enter="movieSearch">
            <button class="btn btn-light me-4" @click="movieSearch">Cerca</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { store } from '../assets/data/store'
export default {
    name: 'HeaderComponent',
    data() {
        return {
            search: '',
            store,
            genreSelected: ''
        }
    },
    methods: {
        movieSearch() {
            if (this.search === '' || this.search.trim() === '') {
                this.search = ''
            } else {
                this.$emit('search-movie', this.search);
                this.search = ''
                store.bestMovies = false
                console.log(store.keyWord)
            }


        },
        filterGenre() {
            if (this.genreSelected === '') {
                const url = store.apiUrl + store.endpoint.popularMovies
                const url2 = store.apiUrl + store.endpoint.popularSeries
                axios.get(url, { params: store.params }).then((res) => {
                    this.store.movieList = res.data.results
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
                    store.bestMovies = true
                });
                axios.get(url2, { params: store.params }).then((res) => {
                    this.store.seriesList = res.data.results
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
                    store.bestMovies = true
                });
            } else {
                const url = store.apiUrl + store.endpoint.discoverMovie
                const url2 = store.apiUrl + store.endpoint.discoverSeries
                const api_key = '79822ad1ecd0e1c275a39196556cb1e3'
                axios.get(url + '?with_genres=' + this.genreSelected + '&api_key=' + api_key).then((res) => {
                    this.store.movieList = res.data.results
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
                    store.bestMovies = true
                });
                axios.get(url2 + '?with_genres=' + this.genreSelected + '&api_key=' + api_key).then((res) => {
                    this.store.seriesList = res.data.results
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.loading = false
                    store.bestMovies = true
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

.bg-background {
    background-color: $brand_primary;
    height: 80px;
}

img {
    width: 200px;

    &:hover {
        cursor: pointer;
    }
}

.form-control {
    border-radius: 0;
}

input[type="text"],
textarea {
    background-color: $brand_primary;
    color: white;
}

::placeholder {
    color: white;
}

.btn {
    border-radius: 0;
    background-color: $brand_secondary;
    color: white;
}

select {
    height: 100%;
    min-width: 180px;
    z-index: 100;
    margin-right: 30px;
}
</style>