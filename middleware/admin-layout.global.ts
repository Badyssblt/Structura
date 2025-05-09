// Define layout admin to all pages in pages/admin
export default defineNuxtRouteMiddleware((to) => {
    if (to.path.startsWith('/admin')) {
        to.meta.layout = 'admin'
    }
})
