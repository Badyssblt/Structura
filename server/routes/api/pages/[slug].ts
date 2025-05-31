import {PrismaClient} from "~/generated/prisma";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const { slug } = getRouterParams(event)

    if(slug === "first"){
        return prisma.page.findFirst();
    }else {
        return  prisma.page.findUnique({
            where: {
                slug: slug
            }
        })
    }

})
