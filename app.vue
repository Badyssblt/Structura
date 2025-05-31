<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const router = useRouter()
useShortcuts()

</script>

<template>
  <Toaster/>
  <NuxtLayout>
      <NuxtPage/>
      <Toaster/>
  </NuxtLayout>
</template>
