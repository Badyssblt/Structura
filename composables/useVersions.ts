import type { Version } from '~/types/types'

export const useVersion = () => {
    const versions = useState<Version[] | null>('versions', () => null)
    const currentVersion = useState<Version | null>('version', () => null)

    const isLoadingVersions = useState<boolean>('isLoadingVersions', () => false)
    const isDeletingVersion = useState<boolean>('isDeletingVersion', () => false)
    const isPatchingVersion = useState<boolean>('isPatchingVersion', () => false)
    const isCreatingVersion = useState<boolean>('isCreatingVersion', () => false)

    const getAllVersions = async (): Promise<Version[]> => {
        isLoadingVersions.value = true
        try {
            const response = await useApi().get('/api/version')
            versions.value = response
        } catch (e) {
            console.log(e)
        }
        isLoadingVersions.value = false
        return versions.value
    }

    const getCurrentVersion = async () => {
        const versions = getAllVersions()

        return (await versions).find(version => version.isCurrent)
    }

    const getVersionBySlug = async (slug: string): Promise<Version> => {
        if (versions.value) {
            const version = versions.value.find(v => v.slug === slug)
            if (version) return version
        }

        const { data, error } = await useFetch<Version>(`/api/versions/${slug}`)

        currentVersion.value = data.value
        if (error.value || !data.value) {
            throw createError({ statusCode: 404, statusMessage: `Version not found: ${slug}` })
        }

        return currentVersion.value
    }

    const deleteVersion = async (id: string): Promise<void> => {
        isDeletingVersion.value = true

        const { error } = await $fetch<void>(`/api/version/${id}`, {
            method: 'DELETE',
        })

        if (versions.value) {
            versions.value = versions.value.filter(v => v.id !== id)
        }

        isDeletingVersion.value = false
    }

    const patchVersion = async (id: number, patchData: Partial<Version>): Promise<Version> => {
        isPatchingVersion.value = true

        const { data, error } = await useFetch<Version>(`/api/version/${id}`, {
            method: 'PATCH',
            body: patchData,
        })

        if (error.value || !data.value) {
            throw createError({ statusCode: 500, statusMessage: `Failed to patch version: ${id}` })
        }

        if (versions.value) {
            const index = versions.value.findIndex(v => v.id === id)
            if (index !== -1) {
                versions.value[index] = data.value
            }
        }

        isPatchingVersion.value = false
        await getAllVersions()
        return data.value
    }

    const createVersion = async (newVersionData: Partial<Version>): Promise<Version> => {
        isCreatingVersion.value = true

        const { data } = await $fetch<Version>('/api/version', {
            method: 'POST',
            body: newVersionData,
        })

        if (!data) {
            throw createError({ statusCode: 500, statusMessage: 'Failed to create version' })
        }

        await getAllVersions()

        isCreatingVersion.value = false
        return data.value
    }

    return {
        getAllVersions,
        getVersionBySlug,
        deleteVersion,
        patchVersion,
        createVersion,
        getCurrentVersion,
        versions,
        currentVersion,
        isLoadingVersions,
        isDeletingVersion,
        isPatchingVersion,
        isCreatingVersion,
    }
}
