<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const router = useRouter()

useShortcuts([
  {
    keys: ['shift', 'e'],
    handler: () => router.push('/admin')
  },
  {
    keys: ['shift', 'p'],
    handler: () => router.push('/admin/informations')
  }
])
</script>

<template>
  <Toaster/>
  <NuxtLayout>
      <NuxtPage/>
      <Toaster/>
  </NuxtLayout>
</template>
