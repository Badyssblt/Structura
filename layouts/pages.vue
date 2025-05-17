<script setup lang="ts">
import {Aside} from "~/components/MainAside";

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))


</script>

<template>
<div class="flex">
  <Aside class="w-96" v-bind="{ admin: isAdminRoute }"/>
  <slot />
</div>
</template>

<style scoped>

</style>