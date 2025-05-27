import { PrismaClient } from "~/generated/prisma";
import { useSlug } from "~/composables/useSlug";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { slug } = getRouterParams(event);
    const body = await readBody(event);
    const { title, content, order } = body;

    let newSlug: string | undefined = undefined;

    if (title) {
        newSlug = useSlug(title);
    }


    const dataToUpdate: any = {};

    if (title) dataToUpdate.title = title;
    if (content) dataToUpdate.content = content;
    if (typeof order !== "undefined") dataToUpdate.order = order;
    if (newSlug) dataToUpdate.slug = newSlug;
    if (typeof categoryId !== "undefined") dataToUpdate.categoryId = categoryId;


    const updatedPage = await prisma.page.update({
        where: { slug },
        data: dataToUpdate,
    });

    return updatedPage;
});
