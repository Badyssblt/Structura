<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  type: string
  value: string,
  label: string
}>()

const emits = defineEmits<{
  (e: 'update', payload: { type: string, value: string }): void
}>()

const localValue = ref(props.value)

watch(() => props.value, (newVal) => {
  localValue.value = newVal
})

const onColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update', { type: props.type, value: target.value })
}
</script>

<template>
  <div>
    <div class="flex gap-4">
      <label :for="type">{{ label }}</label>
      <input
          type="color"
          :id="type"
          v-model="localValue"
          @input="onColorChange"
      />
    </div>
  </div>
</template>


