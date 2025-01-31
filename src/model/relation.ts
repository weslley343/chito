import { DatabaseError } from "../utils/erros";
import { prisma } from "../utils/prisma";

export const modelClientResponsibleCreate = async (
    client: string, responsible: string

) => {

    const relation = await prisma.client_responsible.create({
        data: {
            client_fk: client,
            responsible_fk: responsible
        }
    })



    if (!relation) {
        console.log(relation)
        throw new DatabaseError("Nao foi possível cadastrar cliente");

    }

    return relation;

};

export const modelClientProfessionalCreate = async (
    client: string, professional: string

) => {

    const relation = await prisma.client_professional.create({
        data: {
            client_fk: client,
            professional_fk: professional
        }
    })



    if (!relation) {
        console.log(relation)
        throw new DatabaseError("Nao foi possível cadastrar cliente");

    }

    return relation;

};

export const modelClientProfessionalDelete = async (
    client: string, professional: string

) => {

    const relation = await prisma.client_professional.deleteMany({
        where: {
            client_fk: client,
            professional_fk: professional

        },
    });

    if (!relation) {
        console.log(relation)
        throw new DatabaseError("Nao foi possível deletar relação entre cliente e profissional");

    }

    return relation;

};

export const modelClientResponsibleDelete = async (
    client: string, responsible: string

) => {

    const relation = await prisma.client_responsible.deleteMany({
        where: {
            client_fk: client,
            responsible_fk: responsible

        },
    });

    if (!relation) {
        console.log(relation)
        throw new DatabaseError("Nao foi possível deletar relação entre cliente e responsible");

    }

    return relation;

};