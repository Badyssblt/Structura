<script setup lang="ts">
import {Aside} from "~/components/MainAside";

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const isAdmin = ref(true)

</script>

<template>
<div class="flex flex-col">
  <AdminBar v-if="isAdmin"/>
  <div class="flex">
    <Aside class="w-72 border-r" v-bind="{ admin: isAdminRoute }"/>
    <div class="p-2 w-full">
      <slot/>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>