import { PrismaClient } from "~/generated/prisma";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const settingsArray = await prisma.setting.findMany();

    const settingsObject = settingsArray.reduce((acc, setting) => {
        try {
            acc[setting.key] = JSON.parse(setting.value);
        } catch (e) {
            acc[setting.key] = setting.value; // fallback brut
        }
        return acc;
    }, {} as Record<string, any>);

    return settingsObject;
});
