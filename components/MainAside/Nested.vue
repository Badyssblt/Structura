<template>
  <draggable
      class="dragArea"
      tag="ul"
      :list="sortedCategories"
      :group="{ name: 'categories' }"
      item-key="name"
  >
    <template #item="{ element: category }">
      <li>
        <div class="flex items-center justify-between" v-if="category.name !== 'no-category'">
          <p class="text-sm font-medium" >{{ category.name }}</p>
          <AlertDialog>
            <AlertDialogTrigger>
              <button><Icon name="heroicons:trash" size="16px" class="text-red-600"/></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Voulez-vous supprimer {{ category.name }} ?</AlertDialogTitle>
              <AlertDialogAction @click="deleteCategory(category.id)">Supprimer</AlertDialogAction>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <draggable
            :class="category.name !== 'no-category' ? 'pl-6' : ''"
            :list="category.pages"
            :group="{ name: 'pages' }"
            item-key="title"
            animation="200"
        >
          <template #item="{ element: page }: { element: Page }">
            <Link :to="'/admin/pages/' + page.slug">
              {{ page.title }}
            </Link>
          </template>
        </draggable>
      </li>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import type {Page} from "~/types/types";
import { Link } from '~/components/MainAside/index'

const { deleteCategory } = useCategory()



const props = defineProps({
  categories: {
    type: Array,
    required: false
  }
})


const sortedCategories = computed(() => {
  if (!props.categories) return [];
  return [...props.categories].sort((a, b) => {
    if (a.name === 'no-category') return 1;
    if (b.name === 'no-category') return -1;
    return 0;
  });
});

</script>


