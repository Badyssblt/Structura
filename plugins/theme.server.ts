// plugins/theme.server.ts (ou plugins/theme.ts universel)
import { defineNuxtPlugin, useHead } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const themeRaw = await useSettings().getOne('theme')
        const theme = JSON.parse(themeRaw.value)

        // Construire CSS variables
        const cssVars = theme.map((el: {type:string,value:string}) => `--${el.type}: ${el.value ?? '00000'}`).join('; ')

        console.log(cssVars)
        useHead({
            style: [
                {
                    children: `:root { ${cssVars} }`
                }
            ]
        })

        // Stocker dans nuxtApp.payload pour l’hydratation client
        nuxtApp.payload.theme = theme

    } catch (e) {
        console.error(e)
    }
})
