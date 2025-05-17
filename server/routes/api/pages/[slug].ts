import {PrismaClient} from "~/generated/prisma";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const { slug } = getRouterParams(event)

    const pages = await prisma.page.findUnique({
        where: {
            slug: slug
        }
    })

    return pages;
})
