import { clients, gender_enum } from '@prisma/client';
import { encryptPassword } from '../utils/encriptor';
import { DatabaseError } from '../utils/erros';
import { generateTokens } from '../utils/generatePairOfTokens';
import { prisma } from '../utils/prisma';

export const ClientCreate = async (
    identifier: string,
    code: string,
    full_name: string,
    birthdate: Date,
    gender: gender_enum,
    description: string,
    creator_fk: string

) => {

    console.log( identifier, code, full_name, birthdate, gender, description, creator_fk    );

    const client = await prisma.clients.create({
        data: {
            identifier: identifier,
            code: code,
            full_name: full_name,
            birthdate: birthdate,
            gender: gender,
            description: description,
            creator_fk: creator_fk
        }
    })

    if (!client) {
        console.log(client)
        throw new DatabaseError("Nao foi possível cadastrar cliente");

    }

    return client;

};


export const getClientById = async (id: string): Promise<clients> => {
    const client = await prisma.clients.findUnique({ where: { id: id } })
    if (!client) {
        throw new DatabaseError("Coud'not recover data of ID");
    }
    return client
}

export const getClientByIdentifier = async (identifier: string): Promise<clients> => {
    const client = await prisma.clients.findUnique({ where: { identifier: identifier } })
    if (!client) {
        throw new DatabaseError("Coud'not recover data of identifier");
    }
    return client
}

export const clientDetail = async (id: string) => {

    const client = await prisma.clients.findUnique({ where: { id: id } })
    if (!client) {
        throw new DatabaseError("Coud'not recover data of ID");
    }
    return client
}

export const clientDelete = async (id: string, creator_fk: string) => {

    const client = await prisma.clients.deleteMany({
        where: {
            id: id,
            creator_fk: creator_fk
        },
    });
    if (!client) {
        throw new DatabaseError("Coud'not find client");
    }
    return client
}

export const getClientByProfessionalId = async (
    skip: number,
    take: number,
    professional: string  // considerando que professional_fk é do tipo String (UUID)
) => {
    const clientProfessionals = await prisma.client_professional.findMany({
        skip,
        take,
        where: {
            professional_fk: professional,
        },
        include: {
            clients: true,  // inclui os dados do cliente relacionado
        },
    });

    // Extrai os dados do cliente do resultado
    const clientData = clientProfessionals.map(
        (entry) => entry.clients
    );

    return clientData;
};




export const getClientByResponsibleId = async (
    skip: number,
    take: number,
    responsible: string  // considerando que professional_fk é do tipo String (UUID)
  ) => {
    const clientResponsibles = await prisma.client_responsible.findMany({
      skip,
      take,
      where: {
        responsible_fk: responsible,
      },
      include: {
        clients: true,  // inclui os dados do cliente relacionado
      },
    });
  
    // Extrai os dados do cliente do resultado
    const clientData = clientResponsibles.map(
      (entry) => entry.clients
    );
  
    return clientData;
  };
  