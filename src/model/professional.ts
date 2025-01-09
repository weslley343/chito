import { DatabaseError } from '../utils/erros';
import { prisma } from '../utils/prisma';

export const create = async (
    identifier: string,
    full_name: string,
    password: string,
    description: string,
    email: string,
    specialty: string
) => {

    const professional = await prisma.professionals.create({
        data: {
            identifier,
            full_name,
            password, // Salva a senha sem criptografia
            description,
            email,
            specialty,
        },
    });
    if(!professional){
        console.log(professional)
        throw new DatabaseError("Nao foi possível cadastrar profissional");
        
    }

    return professional;

};
