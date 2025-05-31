<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {toast} from "vue-sonner";
import {useSettings} from "~/composables/useSettings";
definePageMeta({
  layout: "admin"
})

const { categories, getAllCategories } = useCategory()
const { settings, getSettings, updateSettings } = await useSettings()
await getSettings()
await getAllCategories()
const homepage = ref(settings.value?.homepage?.value || '');
const setHomePage = async () => {
  try {
    await updateSettings({
      homepage: homepage.value
    })
    toast("Page d'accueil modifiée !")
  }catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div>
    <div class="border-b pb-2">
      <h2 class="text-xl font-bold mb-1">Page d'accueil</h2>
      <p class="text-sm opacity-60">Définissez des règles pour la page d'accueil</p>
    </div>
    <div class="my-4">
      <Label for="home_page" class="mb-1">Sélectionner une page</Label>
      <Select id="home_page" v-model="homepage" @update:modelValue="setHomePage">
        <SelectTrigger class="w-48">
          <SelectValue placeholder="Page d'accueil" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="category in categories" >
            <SelectLabel v-if="category.pages.length > 0">{{ category.name === "no-category" ? 'Sans catégorie' : category.name }}</SelectLabel>
            <SelectItem v-for="page in category?.pages" :value="page.slug">
              {{ page.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<style scoped>

</style>