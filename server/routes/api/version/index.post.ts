import { prisma } from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, createdAt } = body

    if (!name || !createdAt) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Missing 'name' or 'createdAt'"
        }))
    }

    try {
        const newVersion = await prisma.version.create({
            data: {
                name,
                createdAt: new Date(createdAt) // s’assure que c’est bien un objet Date
            }
        })

        return {
            message: "Version created successfully",
            data: newVersion
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error creating version: ${error.message}`
        }))
    }
})
