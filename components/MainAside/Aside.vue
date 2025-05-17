<script setup lang="ts">
import { Link } from "~/components/MainAside/index"

const { pages } = usePages()

await usePages().getAllPages()

const props = withDefaults(defineProps<{
  admin?: boolean
}>(), {
  admin: false
})

</script>

<template>
<div class="flex flex-col gap-4 p-4">
  <Link v-for="page in pages" :to="admin ? '/admin/pages/' + page.slug : '/' + page.slug">{{ page.title }}</Link>
</div>
</template>

<style scoped>

</style>