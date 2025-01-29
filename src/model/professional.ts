import { encryptPassword } from '../utils/encriptor';
import { DatabaseError } from '../utils/erros';
import { generateTokens } from '../utils/generatePairOfTokens';
import { prisma } from '../utils/prisma';

export const modelProfessionalCreate = async (
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
            password,
            description,
            email,
            specialty,
        },
    });
    if (!professional) {
        console.log(professional)
        throw new DatabaseError("Nao foi possível cadastrar profissional");

    }

    return professional;

};

export const modelProfessionalSignin = async (password: string, email: string) => {
    const professional = await prisma.professionals.findUnique({ where: { email: email } })
    if (!professional) {
        throw new DatabaseError("Coud'not recover data of email");
    }
    if (professional.password == encryptPassword(password)) {
        let [acetoken, reftoken] = generateTokens(professional.id, professional.identifier, "professional")
        return ({ "signin": true, "reftoken": reftoken, "acetoken": acetoken, "id": professional.id, "type": "professional", "identifier": professional.identifier })
    }
    return ({ "signing": false })

}