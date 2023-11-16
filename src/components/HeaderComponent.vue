<template>
    <div class="bg-black d-flex justify-content-between align-items-center">
        <h1 class="text-danger display-2 fw-bold mx-4 text-uppercase">Boolflix</h1>
        <div class="d-flex">
            <input type="text" class="form-control" placeholder="Cerca il tuo film preferito!" v-model="search"
                @keyup.enter="movieSearch">
            <button class="btn btn-light me-4" @click="movieSearch">Search</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        movieSearch() {
            this.$emit('search-movie', this.search);
            this.search = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.form-control {
    border-radius: 0;
}

.btn {
    border-radius: 0;
}
</style>