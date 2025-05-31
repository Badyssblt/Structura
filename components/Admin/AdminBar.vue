<script setup lang="ts">
const { settings, getSettings } = await useSettings()
await getSettings()
</script>

<template>
<div class="w-full h-13 bg-foreground text-background border-b z-50 flex justify-between items-center px-4">
  <div class="flex items-center gap-4">
    <p>{{ settings?.name.value }}</p>
    <NuxtLink to="/admin/pages"><Button variant="secondary">+ Créer une page</Button></NuxtLink>
  </div>
  <div>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <div class="flex items-center gap-2 cursor-pointer">
          <p>Bon retour, Admin</p>
          <div>
            <img class="w-8" src="https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg?semt=ais_items_boosted&w=740" alt="">
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <NuxtLink to="/admin">Espace administrateur</NuxtLink>
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Paramètres</span>
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Se déconnecter</span>
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
</template>

<style scoped>
</style>