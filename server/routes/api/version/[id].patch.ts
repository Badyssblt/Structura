// server/api/version/[id].patch.ts
import { PrismaClient } from "~/generated/prisma";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));
    const body = await readBody(event);

    if (!id || isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: "Invalid ID" });
    }

    try {
        // Si body.isCurrent est true, on met les autres versions à false
        if (body.isCurrent === true) {
            await prisma.version.updateMany({
                where: {
                    isCurrent: true,
                    NOT: { id }, // exclut l'élément qu'on veut mettre à jour
                },
                data: {
                    isCurrent: false,
                },
            });
        }

        const updatedVersion = await prisma.version.update({
            where: { id },
            data: {
                name: body.name,
                isCurrent: body.isCurrent,
            },
        });

        return { success: true, data: updatedVersion };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to update version",
            cause: error,
        });
    }
});
