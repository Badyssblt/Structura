<script setup lang="ts">
import { toast } from 'vue-sonner'
import {useSettings} from "~/composables/useSettings";

const settings = await useSettings()

const name = ref<string>(settings.name.value);
const description = ref<string>(settings.description.value);

const updateInformations = async () => {
  try {
    const res = await $fetch('/api/settings', {
      method: "POST",
      body: {
        name: name.value,
        description: description.value
      }
    })
    toast('Modifications enregistrées !')
  }catch (e) {
    console.log(e)
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

    <Button class="mt-4 w-full" type="submit" >Modifier les informations du site</Button>
  </form>

</div>
</template>

<style scoped>

</style>