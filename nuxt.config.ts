import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'shadcn-nuxt',
    'nuxt-tiptap-editor',
    '@nuxt/icon'
  ],
    tiptap: {
        prefix: 'Tiptap',
        lowlight: {
            theme: "github-dark"
        }
    },
  css: ['~/assets/css/tailwind.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    }
})


// export default defineNuxtConfig({
//     vite: {
//         optimizeDeps: {
//             exclude: ['@prisma/client']
//         },
//         server: {
//             hmr: {
//                 overlay: false
//             }
//         }
//     },
//     nitro: {
//         esbuild: {
//             options: {
//                 target: 'esnext'
//             }
//         }
//     }
// })