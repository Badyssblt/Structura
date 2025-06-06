<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import type {ThemeColor} from "~/types/types";

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
