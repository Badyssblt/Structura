import {PrismaClient} from "~/generated/prisma";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Assurez-vous d'attendre le corps de la requête

    Object.entries(body).map(async ([key, value]) => {
        const existingSetting = await prisma.setting.findUnique({
            where: { key }
        });

        if(existingSetting){
            await prisma.setting.update({
                where: { key },
                data: { key, value: {value: value}}
            });

        }else {
            await prisma.setting.create({
                data: { key, value: {value: value}}
            });

        }

        return { message: 'Paramètres pris en compte !' }

    })
});
