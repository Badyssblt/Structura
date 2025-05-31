<script setup lang="ts">
import {toast} from "vue-sonner";

definePageMeta({
  layout: 'pages'
})

const titleRef = ref(null)
const title = ref()

const content = ref("");
const sharedContent = useState<string>('shared-content')
watch(content, (newContent) => {
  sharedContent.value = newContent
})

const handleName = () => {
  title.value = titleRef.value.innerText
}

const createPage = async () => {

  try {
    const res = await $fetch('/api/pages', {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
        order: 0
      }
    })
    toast('Modifications enregistrées !')
  }catch (e) {
    console.log(e)
  }
}
</script>

<template>
<div class="w-full">
  <form @submit.prevent="createPage">
    <div class="flex justify-between">
      <h2 class="text-xl font-medium mb-2" ref="titleRef" contenteditable="true" @input="handleName">Ma page</h2>
      <Button>Créer la page</Button>
    </div>
    <TiptapEditor class="" v-model="content"/>
  </form>

</div>
</template>

<style scoped>

</style>