import { prisma } from "~/lib/prisma"

export default defineEventHandler(async (event) => {


    const body = await readBody(event)

    const { name } = body

    if (!name) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Missing name"
        }))
    }

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
            }
        })

        return {
            message: "Category created successfully",
            data: newCategory
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error creating page: ${error.message}`
        }))
    }
})
