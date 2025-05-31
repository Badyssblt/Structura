<script setup lang="ts">
import {Aside} from "~/components/MainAside";
import {LinkAside} from "~/components/MainAside";

const route = useRoute()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const isAdmin = ref(true)

const linkAside = await useSettings().getOne("linkaside") ?? false

const sharedContent = useState<string>('shared-content')

</script>

<template>
<div class="flex flex-col min-h-screen">
  <AdminBar v-if="isAdmin"/>
  <div class="flex flex-1">
    <Aside class="w-72 border-r" v-bind="{ admin: isAdminRoute }"/>
    <div class="p-2 w-full">
      <slot/>
    </div>
    <div class="w-72 border-l p-4 sticky top-0 h-screen bg-background" v-if="linkAside.value">
      <LinkAside :html="sharedContent"/>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>