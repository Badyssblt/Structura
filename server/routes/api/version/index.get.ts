import {PrismaClient} from "~/generated/prisma";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    try {
        const versions = await prisma.version.findMany({
            include: {
                categories: {
                    include: {
                        pages: true
                    }
                }
            }
        })

        return versions
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error fetching versions: ${error.message}`
        }))
    }
})
