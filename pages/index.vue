<script setup lang="ts">
const setting = await useSettings().getOne("homepage")
const page = await usePages().getPageBySlug(setting.value)

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


