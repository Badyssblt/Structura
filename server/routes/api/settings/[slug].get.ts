import { PrismaClient } from "~/generated/prisma";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { slug } = getRouterParams(event);

    const setting = await prisma.setting.findUnique({
        where: { key: slug },
    });

    if (!setting) return null;

    try {
        return JSON.parse(setting.value);
    } catch (e) {
        return setting.value;
    }
});
