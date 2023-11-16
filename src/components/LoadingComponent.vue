<template>
    <div>
        <i class="fa-solid fa-spinner fa-spin"></i>
    </div>
</template>

<script>
export default {
    name: 'LoadingComponent'
}
</script>

<style lang="scss" scoped>
div {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3000;
    background-color: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5vw;
    color: white;
}
</style>