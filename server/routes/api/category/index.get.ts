import { prisma } from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) // récupère les paramètres query de l'URL
        const versionId = parseInt(query.versionId)

        if (isNaN(versionId)) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: "Invalid versionId"
            }))
        }

        const categories = await prisma.category.findMany({
            where: {
                versionId: versionId
            },
            include: {
                pages: true
            }
        })

        return categories
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error fetching categories: ${error.message}`
        }))
    }
})
