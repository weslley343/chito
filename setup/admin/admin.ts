import { Prisma, PrismaClient } from '@prisma/client';
import readlineSync from 'readline-sync';
import { encryptPassword } from '../../src/utils/encriptor';

const prisma = new PrismaClient();

function clearScreen() {
    process.stdout.write('\x1Bc');  // Sequência ANSI para limpar a tela
}

async function insertProfessional() {
    const identifier = readlineSync.question('Identificador do profissional (30 caracteres): ');
    const full_name = readlineSync.question('Nome completo do profissional: ');
    const image_url = readlineSync.question('URL da imagem do profissional (opcional): ');
    const password = encryptPassword(readlineSync.question('Senha do profissional: '));
    const description = readlineSync.question('Descrição do profissional (opcional): ');
    const email = readlineSync.question('Email do profissional: ');
    const specialty = readlineSync.question('Especialidade do profissional: ');

    // Inserir profissional no banco
    const professional = await prisma.professionals.create({
        data: {
            identifier,
            full_name,
            image_url: image_url || null,  // Se não preencher, será null
            password,
            description: description || null,  // Se não preencher, será null
            email,
            specialty,
            created_at: new Date(),
        },
    });

    console.log(`Profissional ${professional.full_name} inserido com sucesso!`);
}

async function insertResponsible() {
    const identifier = readlineSync.question('Identificador do responsável (30 caracteres): ');
    const full_name = readlineSync.question('Nome completo do responsável: ');
    const image_url = readlineSync.question('URL da imagem do responsável (opcional): ');
    const password = encryptPassword(readlineSync.question('Senha do responsável: '));
    const description = readlineSync.question('Descrição do responsável (opcional): ');
    const email = readlineSync.question('Email do responsável: ');

    // Inserir responsável no banco
    const responsible = await prisma.responsibles.create({
        data: {
            identifier,
            full_name,
            image_url: image_url || null,  // Se não preencher, será null
            password,
            description: description || null,  // Se não preencher, será null
            email,
            created_at: new Date(),
        },
    });

    console.log(`Responsável ${responsible.full_name} inserido com sucesso!`);
}

async function main() {
    while (true) {
        clearScreen();
        // Perguntar ao usuário o que ele deseja fazer
        const entityType = readlineSync.question(`
        [1] Inserir profissional
        [2] Inserir responsável
        [s] Sair
        -> `).toLowerCase();

        if (entityType === '1') {
            await insertProfessional();
        } else if (entityType === '2') {
            await insertResponsible();
        } else if (entityType === 's') {
            console.log('Saindo...');
            break;  // Sai do loop
        } else {
            console.log('Opção inválida!');
        }
    }
}

main()
    .catch((e) => {
        console.error('Erro:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });