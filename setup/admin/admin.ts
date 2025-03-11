import { PrismaClient } from '@prisma/client';
import readlineSync from 'readline-sync';
import { encryptPassword } from '../../src/utils/encriptor';


const prisma = new PrismaClient();



// Função para inserir um profissional
async function insertProfessional() {
    const identifier = readlineSync.question('Identificador do profissional (30 caracteres): ');
    const full_name = readlineSync.question('Nome completo do profissional: ');
    const image_url = readlineSync.question('URL da imagem do profissional (opcional): ');
    const password = await encryptPassword(readlineSync.question('Senha do profissional: '));  // Criptografando a senha
    const description = readlineSync.question('Descrição do profissional (opcional): ');
    const email = readlineSync.question('Email do profissional: ');
    const specialty = readlineSync.question('Especialidade do profissional: ');

    // Inserir profissional no banco
    const professional = await prisma.professionals.create({
        data: {
            identifier,
            full_name,
            image_url: image_url || null,  // Se não preencher, será null
            password,  // Senha já criptografada
            description: description || null,  // Se não preencher, será null
            email,
            specialty,
            created_at: new Date(),
        },
    });

    console.log(`Profissional ${professional.full_name} inserido com sucesso!`);
}

// Função para inserir um responsável
async function insertResponsible() {
    const identifier = readlineSync.question('Identificador do responsável (30 caracteres): ');
    const full_name = readlineSync.question('Nome completo do responsável: ');
    const image_url = readlineSync.question('URL da imagem do responsável (opcional): ');
    const password = await encryptPassword(readlineSync.question('Senha do responsável: '));  // Criptografando a senha
    const description = readlineSync.question('Descrição do responsável (opcional): ');
    const email = readlineSync.question('Email do responsável: ');

    // Inserir responsável no banco
    const responsible = await prisma.responsibles.create({
        data: {
            identifier,
            full_name,
            image_url: image_url || null,  // Se não preencher, será null
            password,  // Senha já criptografada
            description: description || null,  // Se não preencher, será null
            email,
            created_at: new Date(),
        },
    });

    console.log(`Responsável ${responsible.full_name} inserido com sucesso!`);
}

// Função para deletar um profissional pelo identifier
async function deleteProfessional() {
    const identifier = readlineSync.question('Digite o identificador do profissional a ser deletado: ');

    // Verificar se o profissional existe
    const professional = await prisma.professionals.findUnique({
        where: { identifier },
    });

    if (!professional) {
        console.log('Profissional não encontrado!');
        return;
    }

    // Deletar o profissional
    await prisma.professionals.delete({
        where: { identifier },
    });

    console.log(`Profissional com identificador ${identifier} deletado com sucesso!`);
}

// Função para deletar um responsável pelo identifier
async function deleteResponsible() {
    const identifier = readlineSync.question('Digite o identificador do responsável a ser deletado: ');

    // Verificar se o responsável existe
    const responsible = await prisma.responsibles.findUnique({
        where: { identifier },
    });

    if (!responsible) {
        console.log('Responsável não encontrado!');
        return;
    }

    // Deletar o responsável
    await prisma.responsibles.delete({
        where: { identifier },
    });

    console.log(`Responsável com identificador ${identifier} deletado com sucesso!`);
}

// Função para limpar a tela
function clearScreen() {
    process.stdout.write('\x1Bc');  // Sequência ANSI para limpar a tela
}

// Função principal com o loop while
async function main() {
    while (true) {
        clearScreen();  // Limpar a tela a cada iteração do loop

        // Perguntar ao usuário o que ele deseja fazer
        const entityType = readlineSync.question(`
        [1] Inserir profissional
        [2] Inserir responsável
        [3] Deletar profissional
        [4] Deletar responsável
        [s] Sair
        -> `).toLowerCase();

        if (entityType === '1') {
            await insertProfessional();
        } else if (entityType === '2') {
            await insertResponsible();
        } else if (entityType === '3') {
            await deleteProfessional();
        } else if (entityType === '4') {
            await deleteResponsible();
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
