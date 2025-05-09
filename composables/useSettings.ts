import type { Settings } from '~/types/types'

export const useSettings = async () => {
    const settings = useState<Settings | null>('settings', () => null)

    if (!settings.value) {
        const { data, error } = await useFetch<Settings>('/api/settings')

        if (error.value || !data.value) {
            throw createError({ statusCode: 500, statusMessage: 'Unable to fetch settings' })
        }

        settings.value = data.value
    }

    return settings.value
}
