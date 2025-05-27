<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-vue-next'


const route = useRoute()

definePageMeta({
  layout: "pages"
})

const slug: string = route.params.slug

const page = await usePages().getPageBySlug(slug)

const { isLoadingPages, isPatchingPage } = usePages()

const content = ref(page.content)

const emits = defineEmits(['getPages'])

const titleRef = ref(null)
const title = ref()

const deletePage = async () => {
  try {
    await usePages().deletePage(slug)
    navigateTo('/admin/pages')
  }catch (e) {

  }
}

const editPage = async () => {
  try {
    const response = await usePages().patchPage(slug, {
      title: title.value,
      content: content.value,
      order: 0
    })
  }catch (e) {

  }
}

const handleName = () => {
  title.value = titleRef.value.innerText
}
</script>

<template>

<div v-if="page" class="w-full p-4">
  <form @submit.prevent="createPage">
    <div class="flex justify-between">
      <h2 class="text-xl font-medium mb-2" ref="titleRef" contenteditable="true" @input="handleName">{{ page.title }}</h2>
      <div class="flex gap-2">
        <Button @click="editPage">
          Modifier la page
          <Loader2 class="w-4 h-4 animate-spin" v-if="isPatchingPage"/>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="destructive">
              Supprimer la page
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Voulez-vous supprimer {{ page.title }} ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est définitive et ne pourra pas être annulée. Veuillez confirmer si vous souhaitez continuer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction @click="deletePage">Confirmer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    <TiptapEditor class="" v-model="content"/>
  </form>
</div>
</template>

<style scoped>

</style>