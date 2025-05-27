import { prisma } from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                pages: true
            }
        })

        return categories
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error creating page: ${error.message}`
        }))
    }
})
