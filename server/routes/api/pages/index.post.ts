import { prisma } from "~/lib/prisma"
import {useSlug} from "~/composables/useSlug";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { title, content, order, categoryId } = body

    if (!title || !content) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Missing title or content"
        }))
    }

    const slug = useSlug(title)

    // Récupérer ou créer la catégorie "no-category" si nécessaire
    let finalCategoryId = categoryId

    if (!finalCategoryId) {
        let noCategory = await prisma.category.findFirst({
            where: { name: "no-category" }
        })

        if (!noCategory) {
            noCategory = await prisma.category.create({
                data: { name: "no-category" }
            })
        }

        finalCategoryId = noCategory.id
    }

    try {
        const newPage = await prisma.page.create({
            data: {
                title,
                content,
                slug,
                order: order ?? 0,
                categoryId: finalCategoryId
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
