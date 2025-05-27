import type { Category } from '~/types/types'

export const useCategory = () => {
    const categories = useState<Category[] | null>('categories', () => null)
    const currentCategory = useState<Category | null>('category', () => null)

    const isLoadingCategories = useState<boolean>('isLoadingCategories', () => false)
    const isDeletingCategory = useState<boolean>('isDeletingCategory', () => false)
    const isPatchingCategory = useState<boolean>('isPatchingCategory', () => false)
    const isCreatingCategory = useState<boolean>('isCreatingCategory', () => false)

    const getAllCategories = async (): Promise<Category[]> => {
        isLoadingCategories.value = true
        try {
            const response = await $fetch<Category[]>('/api/category')

            categories.value = response
        }catch (e) {
            console.log(e)
        }

        isLoadingCategories.value = false
        return categories.value
    }

    const getCategoryBySlug = async (slug: string): Promise<Category> => {
        if (categories.value) {
            const category = categories.value.find(c => c.slug === slug)
            if (category) return category
        }

        const { data, error } = await useFetch<Category>(`/api/categories/${slug}`)

        currentCategory.value = data.value
        if (error.value || !data.value) {
            throw createError({ statusCode: 404, statusMessage: `Category not found: ${slug}` })
        }

        return currentCategory.value
    }

    const deleteCategory = async (id: string): Promise<void> => {
        isDeletingCategory.value = true

        const { error } = await $fetch<void>(`/api/category/${id}`, {
            method: 'DELETE',
        })


        if (categories.value) {
            categories.value = categories.value.filter(c => c.id !== id)
        }

        isDeletingCategory.value = false
    }

    const patchCategory = async (slug: string, patchData: Partial<Category>): Promise<Category> => {
        isPatchingCategory.value = true

        const { data, error } = await useFetch<Category>(`/api/categories/${slug}`, {
            method: 'PATCH',
            body: patchData,
        })

        if (error.value || !data.value) {
            throw createError({ statusCode: 500, statusMessage: `Failed to patch category: ${slug}` })
        }

        if (categories.value) {
            const index = categories.value.findIndex(c => c.slug === slug)
            if (index !== -1) {
                categories.value[index] = data.value
            }
        }

        isPatchingCategory.value = false
        return data.value
    }

    const createCategory = async (newCategoryData: Partial<Category>): Promise<Category> => {
        isCreatingCategory.value = true

        const { data } = await $fetch<Category>('/api/category', {
            method: 'POST',
            body: newCategoryData,
        })

        if (!data) {
            throw createError({ statusCode: 500, statusMessage: 'Failed to create category' })
        }


        await getAllCategories()


        isCreatingCategory.value = false
        return data.value
    }

    return {
        getAllCategories,
        getCategoryBySlug,
        deleteCategory,
        patchCategory,
        createCategory,
        categories,
        isLoadingCategories,
        isDeletingCategory,
        isPatchingCategory,
        isCreatingCategory,
    }
}
