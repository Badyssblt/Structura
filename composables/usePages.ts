import type { Page } from '~/types/types'

export const usePages = () => {
    const pages = useState<Page[] | null>('pages', () => null)
    const currentPage = useState<Page |null>("page", () => null)

    const isLoadingPages = useState<boolean>('isLoadingPages', () => false)
    const isDeletingPage = useState<boolean>('isDeletingPage', () => false)
    const isPatchingPage = useState<boolean>('isPatchingPage', () => false)


    const getAllPages = async (): Promise<Page[]> => {
        isLoadingPages.value = true
        if (!pages.value) {
            const { data, error } = await useFetch<Page[]>('/api/pages')

            if (error.value || !data.value) {
                throw createError({ statusCode: 500, statusMessage: 'Unable to fetch pages' })
            }

            pages.value = data.value
        }

        isLoadingPages.value = false
        return pages.value
    }

    const getPageBySlug = async (slug: string): Promise<Page> => {
        if (pages.value) {
            const page = pages.value.find(p => p.slug === slug)
            if (page) return page
        }

        const { data, error } = await useFetch<Page>(`/api/pages/${slug}`)

        currentPage.value = data.value
        if (error.value || !data.value) {
            throw createError({ statusCode: 404, statusMessage: `Page not found: ${slug}` })
        }

        return currentPage.value
    }

    // Supprime une page par son slug
    const deletePage = async (slug: string): Promise<void> => {
        const { error } = await useFetch<void>(`/api/pages/${slug}`, {
            method: 'DELETE',
        })

        if (error.value) {
            throw createError({ statusCode: 500, statusMessage: `Failed to delete page: ${slug}` })
        }

        // Met à jour le cache local si présent
        if (pages.value) {
            pages.value = pages.value.filter(p => p.slug !== slug)
        }
    }

    // Met à jour une page partiellement (patch)
    const patchPage = async (slug: string, patchData: Partial<Page>): Promise<Page> => {
        isPatchingPage.value = true
        const { data, error } = await useFetch<Page>(`/api/pages/${slug}`, {
            method: 'PATCH',
            body: patchData,
        })

        if (error.value || !data.value) {
            throw createError({ statusCode: 500, statusMessage: `Failed to patch page: ${slug}` })
        }

        // Met à jour le cache local si présent
        if (pages.value) {
            const index = pages.value.findIndex(p => p.slug === slug)
            if (index !== -1) {
                pages.value[index] = data.value
            }
        }

        isPatchingPage.value = false
        return data.value
    }

    return {
        getAllPages,
        getPageBySlug,
        deletePage,
        patchPage,
        pages,
        isLoadingPages,
        isPatchingPage
    }
}
