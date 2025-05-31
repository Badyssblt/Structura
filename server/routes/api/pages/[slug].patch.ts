import { prisma } from "~/lib/prisma";
import { useSlug } from "~/composables/useSlug";

export default defineEventHandler(async (event) => {
    try {
        const { slug } = getRouterParams(event);
        const body = await readBody(event);
        const { title, content, order, categoryId } = body;

        let newSlug: string | undefined = undefined;
        if (title) {
            newSlug = useSlug(title);
        }

        // Récupérer la page existante pour obtenir son categoryId actuel
        const existingPage = await prisma.page.findUnique({
            where: { slug },
        });

        if (!existingPage) {
            throw new Error("Page non trouvée");
        }

        // On prépare les champs à modifier
        const dataToUpdate: any = {};
        if (title) dataToUpdate.title = title;
        if (content) dataToUpdate.content = content;
        if (newSlug) dataToUpdate.slug = newSlug;
        if (typeof categoryId !== "undefined") dataToUpdate.categoryId = categoryId;

        const targetCategoryId = categoryId ?? existingPage.categoryId;

        if (typeof order === "number" && targetCategoryId) {
            // 1. Récupérer les pages de cette catégorie, sauf celle qu'on est en train de modifier
            let pages = await prisma.page.findMany({
                where: {
                    categoryId: targetCategoryId,
                    NOT: { slug },
                },
                orderBy: { order: "asc" },
            });

            // 2. Injecter notre page modifiée à la bonne position
            pages.splice(order, 0, { ...existingPage, order }); // insérer à la position `order`

            // 3. Réaffecter les orders (0, 1, 2, ...)
            await Promise.all(
                pages.map((page, index) =>
                    prisma.page.update({
                        where: { id: page.id },
                        data: { order: index },
                    })
                )
            );

            dataToUpdate.order = order;
        } else if (typeof order === "number") {
            dataToUpdate.order = order;
        }

        // 4. Mise à jour de la page
        const updatedPage = await prisma.page.update({
            where: { slug },
            data: dataToUpdate,
        });

        // 5. Retourner la catégorie avec pages triées
        if (updatedPage.categoryId) {
            const categoryWithPages = await prisma.category.findUnique({
                where: { id: updatedPage.categoryId },
                include: {
                    pages: {
                        orderBy: { order: "asc" },
                    },
                },
            });

            return categoryWithPages;
        }

        return updatedPage;

    } catch (error: any) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: `Erreur lors de la mise à jour : ${error.message}`,
        }));
    }
});
