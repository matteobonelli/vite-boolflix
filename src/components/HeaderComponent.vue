<template>
    <div class="d-flex justify-content-between align-items-center bg-background">
        <img src="images/netflix-logo.png" alt="neflix logo">
        <div class="d-flex">
            <input type="text" class="form-control" placeholder="Cerca il tuo film preferito!" v-model="search"
                @keyup.enter="movieSearch">
            <button class="btn btn-light me-4" @click="movieSearch">Search</button>
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store'
export default {
    name: 'HeaderComponent',
    data() {
        return {
            search: '',
            store
        }
    },
    methods: {
        movieSearch() {
            this.$emit('search-movie', this.search);
            this.search = ''

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
}

.form-control {
    border-radius: 0;
}

.btn {
    border-radius: 0;
}
</style>