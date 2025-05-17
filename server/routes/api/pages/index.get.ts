import {usePrisma} from "~/composables/use-prisma";
import {PrismaClient} from "~/generated/prisma";
import {useSlug} from "~/composables/useSlug";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const pages = await prisma.page.findMany()

    return pages;
})
