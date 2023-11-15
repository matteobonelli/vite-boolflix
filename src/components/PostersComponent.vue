<template>
    <div class="col-12 col-md-4 col-lg-3 mb-5">
        <div>
            {{ name }}
        </div>
        <div>
            {{ title }}
        </div>
        <div>
            {{ originalTitle }}
        </div>
        <div>
            {{ originalName }}
        </div>
        <div>
            {{ language }}
        </div>
        <div>
            {{ rating }}
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
        rating: Number
    },
    data() {
        return {
            store
        }
    }
}
</script>

<style lang="scss" scoped></style>