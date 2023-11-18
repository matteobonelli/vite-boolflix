<template>
    <div class="d-flex justify-content-between align-items-center bg-background">
        <div class="d-flex align-items-center">
            <img src="images/netflix-logo.png" alt="neflix logo" @click="$emit('reloadPage'), this.genreSelected = ''">
            <div>
                <select class="form-select" name="genres" id="genres" @change="$emit('filterGenre', genreSelected)"
                    v-model="genreSelected">
                    <option value="">Seleziona il tuo genere preferito!</option>
                    <option value="all">All</option>
                    <option v-for="genre in store.genreList" :value="genre.id" :key="genre.id">{{ genre.name }}</option>
                </select>
            </div>
        </div>

        <div class="d-flex">
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
                this.genreSelected = ''
            }


        },
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
    margin-right: 40px;

    &:hover {
        cursor: pointer;
    }
}

.form-select,
.form-control {
    border-radius: 0;
}

input[type="text"],
textarea,
select {
    background-color: $brand_primary;
    color: white;
}



label {
    display: block;
}

::placeholder {
    color: white;
}

.btn {
    border-radius: 0;
    background-color: $brand_secondary;
    color: white;
}
</style>