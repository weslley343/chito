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

    const client = await prisma.clients.create({
        data: {
            identifier, 
            code,
            full_name, 
            birthdate,
            gender, 
            description,
            creator_fk
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