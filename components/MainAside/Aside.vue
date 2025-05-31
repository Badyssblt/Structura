<script setup lang="ts">
import ContextMenu from './ContextMenu.vue'
import Nested from "./Nested.vue"

const { pages, getAllPages } = usePages()
await getAllPages()

const { categories, getAllCategories, deleteCategory } = useCategory()
await getAllCategories()



const props = withDefaults(defineProps<{
  admin?: boolean
}>(), {
  admin: false
})

// Position et affichage du menu contextuel
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const showContextMenu = ref(false)

function openContextMenu(event: MouseEvent) {
  event.preventDefault()
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  showContextMenu.value = true
}

function closeContextMenu() {
  showContextMenu.value = false
}

function handleSelect(action: string) {
  console.log('Action sélectionnée:', action)
  showContextMenu.value = false
}
</script>

<template>
  <div class="relative" @contextmenu="openContextMenu">
    <div  class="flex flex-col gap-4 p-4">
      <NuxtLink to="/admin/pages" class="bg-primary text-primary-foreground px-2 py-1 rounded-md font-medium" v-if="admin">Créer une page</NuxtLink>
      <Nested :categories="categories" class="flex flex-col" :admin="admin"/>
    </div>

    <!-- 🔗 Menu contextuel séparé -->
    <ContextMenu
        :x="contextMenuX"
        :y="contextMenuY"
        :show="showContextMenu"
        @close="closeContextMenu"
        @select="handleSelect"
    />
  </div>
</template>
