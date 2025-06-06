import { ref, watch, onMounted, useNuxtApp } from '#imports'

export function useTheme() {
    const theme = ref<{type: string, value: string}[]>([])
    const nuxtApp = useNuxtApp()

    const applyTheme = () => {
        if (process.client && theme.value.length) {
            const root = document.documentElement
            theme.value.forEach(el => {
                root.style.setProperty(`--${el.type}`, el.value ?? '00000')
            })
        }
    }

    // Charger le thème (SSR ou client)
    const loadTheme = async () => {
        try {
            const themeRaw = await useSettings().getOne('theme')
            theme.value = JSON.parse(themeRaw.value)
            if(import.meta.client){
                applyTheme()
            }
        } catch (e) {
            console.error('Failed to load theme:', e)
        }
    }


    return {
        theme,
        loadTheme,
    }
}
