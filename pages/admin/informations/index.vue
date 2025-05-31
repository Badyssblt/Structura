<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useSettings } from "~/composables/useSettings"

const { settings, getSettings, updateSettings } = await useSettings()
await getSettings()

const name = ref<string>(settings.value?.name?.value || '')
const description = ref<string>(settings.value?.description?.value || '')


definePageMeta({
  layout: 'admin'
})

const updateInformations = async () => {
  try {
    await updateSettings({
      name: name.value ,
      description: description.value
    })
    toast('Modifications enregistrées !')
  } catch (e) {
    console.log(e)
    toast('Erreur lors de la sauvegarde')
  }
}
</script>

<template>
  <div>
    <form class="flex flex-col gap-4" @submit.prevent="updateInformations">
      <div class="flex flex-col gap-2">
        <Label>Nom du site</Label>
        <Input placeholder="Structura" v-model="name"/>
      </div>
      <div class="flex flex-col gap-2">
        <Label>Description du site</Label>
        <Input placeholder="Documentation de Structura" v-model="description"/>
      </div>
      <Button class="mt-4 w-full" type="submit">
        Modifier les informations du site
      </Button>
    </form>
  </div>
</template>

<style scoped>
</style>