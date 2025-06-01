<script setup lang="ts">
import draggable from "vuedraggable";
import type {Page} from "~/types/types";
import { Link } from '~/components/MainAside/index'

const { deleteCategory } = useCategory()

const route = useRoute()
const slug = computed(() => route.params.slug)

const props = defineProps({
  categories: {
    type: Array,
    required: false
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
})


const onPageMove = async (event, categoryId) => {
  try {
    const body = {
      categoryId,
      order: event.added?.newIndex ?? event.moved?.newIndex ?? 0
    };
    const slug = event.added?.element.slug ?? event.moved?.element.slug;
    if (!slug) return;

    await usePages().patchPage(slug, body);

  } catch (e) {
    console.error(e);
  }
};

const sortedCategories = ref<CategoryWithPages[]>([]);

onMounted(() => {
  if(!props.categories) return
  sortedCategories.value = [...props.categories]
      .map(category => ({
        ...category,
        pages: [...category.pages].sort((a, b) => a.order - b.order)
      }))
      .sort((a, b) => {
        if (a.name === 'no-category') return 1;
        if (b.name === 'no-category') return -1;
        return 0;
      });
});

</script>

<template>
  <draggable
      class="dragArea"
      tag="ul"
      :list="sortedCategories"
      :group="{ name: 'categories' }"
      item-key="name"
      v-if="admin"
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
            class="flex flex-col"
            @change="onPageMove($event, category.id)"
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
  <div v-else>
    <ul class="flex flex-col ">
      <li v-for="category in sortedCategories">
        <div class="flex items-center justify-between" v-if="category.name !== 'no-category'">
          <p class="text-sm font-medium" >{{ category.name }}</p>
        </div>

        <div
            :class="category.name !== 'no-category' ? 'pl-6' : ''"
            class="flex flex-col"
            @change="onPageMove($event, category.id)"
        >
          <div v-for="page in category.pages">
            <Link :to="admin ? '/admin/pages/' + page.slug : '/' + page.slug" :class="page.slug === slug ? 'text-primary font-medium' : ''">
              {{ page.title }}
            </Link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>




