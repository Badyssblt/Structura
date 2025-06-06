export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loadTheme } = useTheme()

    await loadTheme()
})