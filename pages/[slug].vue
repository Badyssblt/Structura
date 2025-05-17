<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const page = await usePages().get(slug)

</script>

<template>

</template>

<style scoped>

</style>