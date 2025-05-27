<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {useCategory} from "~/composables/useCategory";
import {toast} from "vue-sonner";


const { createCategory } = useCategory()

const props = defineProps<{
  x: number
  y: number
  show: boolean
}>()

const emit = defineEmits(['close', 'select'])

const localShow = ref(props.show)
const categoryName = ref("")

watch(() => props.show, val => {
  localShow.value = val
})

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement

  const isInContextMenu = target.closest('.context-menu')
  const isInDialog = target.closest('.dialog-content')

  if (!isInContextMenu && !isInDialog) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
      v-if="localShow"
      :style="{ top: `${y}px`, left: `${x}px` }"
      class="context-menu absolute bg-white border rounded shadow-lg w-48 z-50"
  >
    <ul class="text-sm text-gray-800">
      <Dialog>
        <DialogTrigger as-child>
          <li
              @click.stop
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Créer une catégorie
          </li>
        </DialogTrigger>
        <DialogContent class="dialog-content sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Créer une catégorie</DialogTitle>
            <DialogDescription>
              Remplissez les champs pour créer une nouvelle catégorie.
            </DialogDescription>
          </DialogHeader>
          <form @submit.prevent="() => createCategory({ name: categoryName })">
            <div class="flex flex-col gap-1">
              <Label for="name" class="text-right">Nom</Label>
              <Input id="name" class="col-span-3" v-model="categoryName"/>
            </div>
            <Button type="submit">Créer</Button>
          </form>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ul>
  </div>
</template>

<style scoped>
/* facultatif : tu peux styliser .context-menu ou .dialog-content ici */
</style>
