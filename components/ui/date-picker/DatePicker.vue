<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long',
})

const rawDate = ref<DateValue>()

const model = defineModel()

watch(rawDate, () => {
  model.value = new Date(rawDate.value.year, rawDate.value.month - 1, rawDate.value.day)
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          :class="cn(
          'w-full justify-start text-left font-normal',
          !rawDate && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ rawDate ? df.format(rawDate.toDate(getLocalTimeZone())) : "Choisir une date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar initial-focus v-model="rawDate"/>
    </PopoverContent>
  </Popover>
</template>