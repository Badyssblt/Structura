import { prisma } from "~/lib/prisma"
export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)

    try {
        const category = await prisma.category.delete({
            where: {
                id: id
            }
        })
        return category
    }catch (e){
        setResponseStatus(event, 500)
        return {
            statusCode: 500,
            message: "Une erreur est survenue",
            error: e.message
        }
    }
})
