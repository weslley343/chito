import { gender_enum } from '@prisma/client';
import { encryptPassword } from '../utils/encriptor';
import { DatabaseError } from '../utils/erros';
import { generateTokens } from '../utils/generatePairOfTokens';
import { prisma } from '../utils/prisma';

export const modelClientCreate = async (
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
