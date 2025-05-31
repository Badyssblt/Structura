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
import {Checkbox} from "~/components/ui/checkbox";
definePageMeta({
  layout: "admin"
})

const { categories, getAllCategories } = useCategory()
const { settings, getSettings, updateSettings } = await useSettings()
await getSettings()
await getAllCategories()
const homepage = ref(settings.value?.homepage?.value || '');
const language = ref(settings.value?.language?.value || '');
const linkAside = ref(settings.value?.linkaside?.value || '');

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

const setLanguage = async () => {
  try {
    await updateSettings({
      language: language.value
    })
    toast("Langue modifiée avec succès !")
  }catch (e) {
    console.log(e)
  }
}

const setLinkAside = async () => {
  try {
    await updateSettings({
      linkaside: linkAside.value
    })
    toast(linkAside.value ? "Barre latéral activée !" : "Barre latéral désactivée !")
  }catch (e) {

  }
}

</script>

<template>
  <div>
    <div class="border-b pb-2">
      <h2 class="text-xl font-bold mb-1">Page d'accueil</h2>
      <p class="text-sm opacity-60">Définissez des règles pour la page d'accueil</p>
    </div>
    <div>
      <h3 class="text-lg font-medium border-b m-4 pb-2">Général</h3>

      <div class="m-4 flex flex-col gap-4">
        <div>
          <Label class="mb-1">Langue par défaut</Label>
          <Select id="language" v-model="language" @update:modelValue="setLanguage">
            <SelectTrigger class="w-48">
              <SelectValue placeholder="FR" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="FR">
                  Français
                </SelectItem>
                <SelectItem value="EN">
                  Anglais
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label for="home_page" class="mb-1">Page par défaut</Label>
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
        <div class="items-top flex gap-x-2">
          <Checkbox id="terms1" v-model="linkAside" @update:modelValue="setLinkAside"/>
          <div class="grid gap-1.5 leading-none">
            <label
                for="terms1"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Activer la barre latéral de navigation
            </label>
            <p class="text-sm text-muted-foreground">
              La barre latéral permet de naviguer entre les différents titres de votre page
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>