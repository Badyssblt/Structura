<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const page = await usePages().getPageBySlug(slug)

definePageMeta({
  layout: "pages"
})

</script>

<template>
<div v-html="page?.content">

</div>
</template>

<style scoped>

</style>


