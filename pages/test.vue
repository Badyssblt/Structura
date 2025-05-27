<template>
  <form @submit="handleSubmit">
    <input v-model="name" type="text" />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')

const handleSubmit = async (event) => {
  event.preventDefault()
  console.log('Nom soumis :', name.value)

  try {
    const response = await $fetch('/api/test', {
      method: 'POST',
      body: { name: name.value }
    })
    console.log('Réponse API :', response)
  } catch (err) {
    console.error('Erreur API :', err)
  }
}
</script>
