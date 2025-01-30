import { DatabaseError } from "../utils/erros";
import { prisma } from "../utils/prisma";

export const modelClientGuardianCreate = async (
    client: string, guardian: string

) => {

    const relation = await prisma.client_responsible.create({
        data: {
            client_fk: client,
            responsible_fk: guardian
        }
    })



    if (!relation) {
        console.log(relation)
        throw new DatabaseError("Nao foi possível cadastrar cliente");

    }

    return relation;

};