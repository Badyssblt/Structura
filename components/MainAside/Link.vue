<script setup lang="ts">
defineProps({
  to: {
    type: String,
    default: "/"
  }
})
</script>

<template>
<NuxtLink :to="to"><slot/></NuxtLink>
</template>

<style scoped>

</style>