import { DatabaseError } from "../utils/erros";
import { prisma } from "../utils/prisma";

export const modelScalesList = async () => {

    const scales = await prisma.scales.findMany()
    if (!scales) {
        console.log(scales)
        throw new DatabaseError("Nao foi possível encontrar escalas");

    }

    return scales;

};

export const modelScalesDetailById = async (id: number) => {

    const questions = await prisma.questions.findMany({
        where: {
            scale_fk: id
            // test: test?.id,
        },
        include: {
            itens: {}
        },
    });

    if (!questions) {
        throw new DatabaseError("No questions associated");
    }
    return questions;

    const scales = await prisma.scales.findMany()
    if (!scales) {
        console.log(scales)
        throw new DatabaseError("Nao foi possível encontrar escalas");

    }

    return scales;

};