<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const page = await usePages().getPageBySlug(slug)

definePageMeta({
  layout: "pages"
})

</script>

<template>
<div class="prose prose-sm sm:prose-base max-w-none" v-html="page?.content">

</div>
</template>

<style scoped>

</style>


