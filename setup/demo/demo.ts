import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../src/utils/encriptor';

const prisma = new PrismaClient();

async function main() {
    // Inserir um responsável
    const responsible = await prisma.responsibles.create({
        data: {
            identifier: 'responsible1',
            full_name: 'João Silva',
            email: 'joao.silva@example.com',
            password: await encryptPassword('senhaSegura123'),
            description: 'Responsável pelo acompanhamento.',
            created_at: new Date(),
        },
    });
    console.log(`Responsável inserido: ${responsible.full_name}`);

    // Inserir um profissional
    const professional = await prisma.professionals.create({
        data: {
            identifier: 'professional1',
            full_name: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            password: await encryptPassword('senhaSegura123'),
            specialty: 'Psicólogo',
            description: 'Profissional especializado em psicologia infantil.',
            created_at: new Date(),
        },
    });
    console.log(`Profissional inserido: ${professional.full_name}`);

    // Inserir 30 usuários
    const users = [];
    for (let i = 1; i <= 30; i++) {
        const user = await prisma.clients.create({
            data: {
                identifier: `user${i}`,
                full_name: `Usuário ${i}`,
                birthdate: new Date(2000, 0, i), // Exemplo de data de nascimento
                gender: i % 2 === 0 ? 'male' : 'female',
                description: `Descrição do usuário ${i}`,
                created_at: new Date(),
            },
        });
        users.push(user);
        console.log(`Usuário inserido: ${user.full_name}`);
    }

    // Associar os usuários ao profissional
    for (const user of users) {
        await prisma.client_professional.create({
            data: {
                client_fk: user.id,
                professional_fk: professional.id,
                created_at: new Date(),
            },
        });
        console.log(`Usuário ${user.full_name} associado ao profissional ${professional.full_name}`);
    }

    // Criar a query para buscar perguntas e itens da escala "ATEC"
    const atecScale = await prisma.scales.findFirst({
        where: { name: 'ATEC' },
        include: {
            questions: {
                include: {
                    itens: true,
                },
            },
        },
    });

    if (atecScale) {
        console.log(`Escala "ATEC" encontrada: ${atecScale.name}`);
        for (const question of atecScale.questions) {
            console.log(`Pergunta: ${question.content}`);
            for (const iten of question.itens) {
                console.log(`  Item: ${iten.content}`);
            }
        }

        // Criar avaliações para cada usuário
        for (const user of users) {
            const evaluation = await prisma.avaliations.create({
                data: {
                    client_fk: user.id,
                    scale_fk: atecScale.id,
                    professional_fk: professional.id, // Add the professional foreign key
                    title: `Avaliação de ${user.full_name}`, // Add a title for the evaluation
                    created_at: new Date(),
                },
            });
            console.log(`Avaliação criada para o usuário ${user.full_name}`);

            // Para cada pergunta da escala, sortear um item e associar à avaliação
            for (const question of atecScale.questions) {
                const randomItem = question.itens[Math.floor(Math.random() * question.itens.length)];
                if (randomItem) {
                    await prisma.answers.create({
                        data: {
                            avaliation_fk: evaluation.id,
                            question_fk: question.id,
                            item_fk: randomItem.id,
                            created_at: new Date(),
                        },
                    });
                    console.log(`Item "${randomItem.content}" associado à avaliação do usuário ${user.full_name}`);
                }
            }
        }
    } else {
        console.log('Escala "ATEC" não encontrada.');
    }
}

main()
    .catch((e) => {
        console.error('Erro:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
