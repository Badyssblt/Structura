import type { Settings } from '~/types/types'

export const useSettings = () => {
    const settings = useState<Settings | null>('settings', () => null)


    const getSettings = async () => {
        const data = await useApi().get('/api/settings')
        if (data) {
            settings.value = data
        }
        return settings.value
    }

    const getOne = async(key: string) => {
        try {
            const data = await useApi().get("/api/settings/" + key)
            if(data){
                return data
            }
            return null
        }catch (e) {

        }
    }

    const updateSettings = async (newSettings: Partial<Settings>) => {
        try {
            const res = await $fetch('/api/settings', {
                method: "POST",
                body: newSettings
            })
            if (settings.value) {
                Object.assign(settings.value, newSettings)
            }

            await getSettings()

            return res
        } catch (error) {
            throw error
        }
    }

    return {
        getSettings,
        updateSettings,
        settings: readonly(settings),
        getOne
    }
}