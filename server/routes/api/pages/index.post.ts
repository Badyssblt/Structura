import {usePrisma} from "~/composables/use-prisma";
import {PrismaClient} from "~/generated/prisma";
import {useSlug} from "~/composables/useSlug";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { title, content, order } = body

    if (!title || !content) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Missing title or content"
        }))
    }

    const slug = useSlug(title)



    try {
        const newPage = await prisma.page.create({
            data: {
                title,
                content,
                slug,
                order: order ?? 0
            }
        })

        return {
            message: "Page created successfully",
            data: newPage
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Error creating page: ${error.message}`
        }))
    }
})
