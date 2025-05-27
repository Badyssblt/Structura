// server/api/test.ts

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Requête reçue :', body)
    return {
        success: true,
        message: 'Catégorie reçue',
        data: body
    }
})
