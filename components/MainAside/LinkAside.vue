<script setup lang="ts">
/**
 * Links are built with a hierarchy based on type
 */
type Link = {
  name: string,
  type: string,
  id?: string
}

const props = withDefaults(defineProps<{
  admin?: boolean,
  html: string
}>(), {
  admin: false,
  html: ""
})

// Parse HTML and extract heading elements into Link[]
const links = computed<Link[]>(() => {
  if (import.meta.client) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(props.html, 'text/html')
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))

    return headings.map(el => ({
      name: el.textContent?.trim() || '',
      type: el.tagName.toLowerCase(),
      id: el.getAttribute('id') || undefined
    }))
  }
  return []
})


// Dynamically calculate padding based on heading level
const getPadding = (type: string): string =>
    `${(parseInt(type.replace('h', ''), 10) - 1) * 0.5}rem`
</script>

<template>
  <div>
    <div v-for="link in links" :key="link.name">
      <a :href="'#' + link.id" :style="{ paddingLeft: getPadding(link.type) }">{{ link.name }}</a>
    </div>
  </div>
</template>

<style scoped>
/* Optionnel : ajouter des styles ici */
</style>
