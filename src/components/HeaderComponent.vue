<template>
    <div class="bg-black d-flex justify-content-between align-items-center">
        <h1 class="text-danger display-2 fw-bold mx-4 ">Boolfix</h1>
        <div>
            <input type="text" placeholder="Cerca il tuo film preferito!" v-model="search">
            <button class="me-4" @click="movieSearch">Search</button>
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

<style lang="scss" scoped></style>