import { encryptPassword } from '../utils/encriptor';
import { DatabaseError } from '../utils/erros';
import { generateTokens } from '../utils/generatePairOfTokens';
import { prisma } from '../utils/prisma';

export const modelResponsibleCreate = async (
    identifier: string,
    full_name: string,
    password: string,
    description: string,
    email: string,
) => {

    const responsible = await prisma.responsibles.create({
        data: {
            identifier,
            full_name,
            password,
            description,
            email,
        },
    });
    if (!responsible) {
        console.log(responsible)
        throw new DatabaseError("Nao foi possível cadastrar profissional");

    }

    return responsible;

};

export const modelResponsibleSignin = async (password: string, email: string) => {
    const responsible = await prisma.responsibles.findUnique({ where: { email: email } })
    if (!responsible) {
        throw new DatabaseError("Coud'not recover data of email");
    }
    if (responsible.password == encryptPassword(password)) {
        let [acetoken, reftoken] = generateTokens(responsible.id, responsible.identifier, "responsible")
        return ({ "signin": true, "reftoken": reftoken, "acetoken": acetoken, "id": responsible.id, "type": "responsible", "identifier": responsible.identifier })
    }
    return ({ "signing": false })

}

export const modelResponsibleDelete = async (id: string) => {
    const responsible = await prisma.responsibles.delete({ where: { id: id } })
    if (!responsible) {
        throw new DatabaseError("Coud'not recover data of email");
    }

    return (responsible)

}

export const getResponsibleByClientId = async (
    skip: number,
    take: number,
    clientId: string // considerando que é um UUID, portanto, uma string
  ) => {
    const clientResponsibles = await prisma.client_responsible.findMany({
      skip,
      take,
      where: {
        client_fk: clientId,
      },
      include: {
        responsibles: true, // inclui os dados do profissional relacionado
      },
    });
    console.log(clientResponsibles);
    // Extrai os dados do profissional do resultado
    const responsibles = clientResponsibles.map(
      (entry) => entry.responsibles
    );
  
    return responsibles;
  };