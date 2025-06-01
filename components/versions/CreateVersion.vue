<script setup lang="ts">
import {DatePicker} from "~/components/ui/date-picker";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "~/components/ui/dialog";
import {toast} from "vue-sonner";

const dateReleased = ref()
const name = ref()

const isFutureDate = computed(() => {
  if (!dateReleased.value) return false
  const selected = new Date(dateReleased.value)
  const today = new Date()

  selected.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return selected > today
})

const createVersion = async () => {
  try {
    const version = await useVersion().createVersion({
      name: name.value,
      createdAt: dateReleased.value
    })
    toast(`Version ${name.value} créer avec succès !`)
  }catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>Ajouter une version</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter une version</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <Label for="number_version">Numéro de version</Label>
          <Input id="number_version" placeholder="1.4.23" v-model="name"/>
        </div>
        <div class="flex flex-col gap-1">
          <Label for="date">Date de publication</Label>
          <DatePicker class="flex-1" v-model="dateReleased"/>
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox id="beta" :disabled="!isFutureDate"/>
          <label
              for="beta"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Marquer comme beta ?
          </label>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" @click="createVersion" :disabled="!name || !dateReleased">
          Créer la version
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>