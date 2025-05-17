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


const route = useRoute()

definePageMeta({
  layout: "pages"
})

const slug: string = route.params.slug

const page = await usePages().getPageBySlug(slug)

const content = ref(page.content)

const emits = defineEmits(['getPages'])

const deletePage = async () => {
  try {
    await usePages().deletePage(slug)
    navigateTo('/admin/pages')
  }catch (e) {

  }
}
</script>

<template>
<div v-if="page" class="w-full p-4">
  <form @submit.prevent="createPage">
    <div class="flex justify-between">
      <h2 class="text-xl font-medium mb-2" ref="titleRef" contenteditable="true" @input="handleName">{{ page.title }}</h2>
      <div class="flex gap-2">
        <Button>Modifier la page</Button>
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
              <AlertDialogAction @click="deletePage">Continue</AlertDialogAction>
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