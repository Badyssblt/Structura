<script setup lang="ts">
import { DateFormatter } from '@internationalized/date'

import {CreateVersion} from "~/components/versions";

definePageMeta({
  layout: "admin"
})

const { versions, getAllVersions } = useVersion()
await getAllVersions()
const selectedVersion = ref(
    versions.value.find((v) => v.isCurrent)?.id
)
// Configuration pour le format dd-mm-yyyy
const df = new DateFormatter('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

const changeVersion = async () => {
  try {
    const version = await useVersion().patchVersion(selectedVersion.value, {
      isCurrent: true
    })
  }catch (e) {

  }
}
</script>

<template>
  <div>
    <div class="border-b pb-2">
      <h2 class="text-xl font-bold">Gérer les versions</h2>
      <p class="opacity-60">Vous pouvez créer des versions et définir celle présente pour les utilisateurs.</p>
    </div>
    <div class="flex items-end gap-2 my-2">
        <div class="flex flex-col gap-1">
          <Label>Version par défaut</Label>
          <Select v-model="selectedVersion" @update:modelValue="changeVersion">
            <SelectTrigger class="w-[200px]">
              <SelectValue placeholder="Version par défaut"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="version in versions" :value="version.id">{{ version.name }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      <CreateVersion/>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full table-auto border border-gray-200 text-sm">
        <thead class="bg-gray-100 text-left">
        <tr>
          <th class="px-4 py-2 border-b">Version</th>
          <th class="px-4 py-2 border-b">Date</th>
          <th class="px-4 py-2 border-b">Statut</th>
          <th class="px-4 py-2 border-b">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="v in versions" :key="v.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-b">{{ v.name }}</td>
          <td class="px-4 py-2 border-b">
            {{
              v.createdAt
                  ? df.format(new Date(v.createdAt)).replace(/\//g, '-')
                  : 'Date invalide'
            }}
          </td>
          <td class="px-4 py-2 border-b">
            <span v-if="v.isCurrent" class="text-green-600 font-semibold">Actuelle</span>
            <span v-else class="text-gray-500">Ancienne</span>
          </td>
          <td class="px-4 py-2 border-b">
            <button
                v-if="!v.isCurrent"
                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Définir
            </button>
            <span v-else class="text-sm text-gray-400">--</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>