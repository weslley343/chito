import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../src/utils/encriptor';

const prisma = new PrismaClient();

async function main() {

    const responsible = await prisma.responsibles.create({
        data: {
            identifier: 'Holly737',
            full_name: 'Holly Hill Bradbury',
            email: 'holly.h@acompanhar.com',
            password: await encryptPassword('senhaSegura123'),
            description: 'Responsável pelo acompanhamento.',
            created_at: new Date(),
        },
    });

    const professional = await prisma.professionals.create({
        data: {
            identifier: 'LionelVI',
            full_name: 'Lionel Vieira Casteliano',
            email: 'lione@acompanhar.com',
            password: await encryptPassword('senhaSegura123'),
            specialty: 'Psicólogo',
            description: 'Profissional especializado em psicologia infantil.',
            created_at: new Date(),
        },
    });

    // Insere 30 usuários no banco de dados
    const names = [
        "Beatriz", "Bruno", "Bianca", "Bernardo", "Bárbara", "Breno",
        "Brenda", "Benício", "Bela", "Bento", "Brisa", "Breno",
        "Berenice", "Baltazar", "Brenda", "Belmiro", "Berta", "Bóris",
        "Bruna", "Bonifácio", "Bia", "Benício", "Brisa", "Benício",
        "Bárbara", "Bartolomeu", "Bela", "Bento", "Bianca", "Breno"
    ];


    const users = [];
    // Cria 3 usuários
    for (let i = 1; i <= 3; i++) {//alterar o 3 para mudar a quantidade de usuários criados. OBS: Max de 30 usuários
        const user = await prisma.clients.create({
            data: {
                identifier: `user${i}-${names[i]}`,
                full_name: `${names[i]}${i} Bartolomeu Silva`,
                birthdate: new Date(2000, 0, i),
                gender: i % 2 === 0 ? 'female' : 'male',
                description: `Descrição do usuário ${names[i]}`,
                created_at: new Date(),
            },
        });
        users.push(user);
    }

    for (const user of users) {
        await prisma.client_professional.create({
            data: {
                client_fk: user.id,
                professional_fk: professional.id,
                created_at: new Date(),
            },
        });
    }

    for (const user of users) {
        await prisma.client_responsible.create({
            data: {
                client_fk: user.id,
                responsible_fk: responsible.id,
                created_at: new Date(),
            },
        });
    }

    const cRScale = await prisma.scales.findFirst({
        where: { name: 'Autism Behavior Checklist' }, // Alterar aqui para mudar a escala
        include: {
            questions: {
                include: {
                    itens: {
                        orderBy: {
                            item_order: 'desc',
                        },
                    },
                },
            },
        },
    });

    if (cRScale) {

        // Cria avaliações para cada usuário
        for (const user of users) {
            const evaluation = await prisma.avaliations.create({
                data: {
                    client_fk: user.id,
                    scale_fk: cRScale.id,
                    professional_fk: professional.id,
                    title: `Primeira Avaliação de ${user.full_name}`,
                    created_at: new Date(),
                },
            });
            console.log(`Avaliação criada para o usuário ${user.full_name}`);

            // Adiciona respostas aleatórias para cada pergunta da primeira avaliação
            for (const question of cRScale.questions) {
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
                }
            }
        }
    } else {
        console.log('Escala "cRScale" não encontrada.');
    }

    //Cria mais 3 avaliações além da primeira
    for (const user of users) {
        for (let i = 2; i <= 4; i++) { //editar 4 para alterar o número de avaliações
            const lastEvaluation = await prisma.avaliations.findFirst({
                where: { client_fk: user.id },
                orderBy: { created_at: 'desc' },
                include: {
                    answers: {
                        include: {
                            itens: true,
                        },
                    },
                },
            });


            if (lastEvaluation) {
                const newEvaluation = await prisma.avaliations.create({
                    data: {
                        client_fk: user.id,
                        scale_fk: cRScale ? cRScale.id : 0,
                        professional_fk: professional.id,
                        title: `Avaliação ${i} de ${user.full_name}`,
                        created_at: new Date(),
                    },
                });



                for (const question of cRScale?.questions || []) {



                    const lastAnswer = lastEvaluation.answers.find(
                        (answer) => answer.question_fk === question.id
                    );

                    console.log(lastAnswer)
                    if (!lastAnswer?.itens) {
                        console.log("não tem itens")
                        break
                    }

                    // Editar aqui para alterar percentual de melhora


                    const randomResult = Math.random() < 0.2; // 20% de chance de melhora

                    let selectedItemId;
                    let selectedItem;
                    if (randomResult) {
                        if (question.itens && Array.isArray(question.itens)) {
                            selectedItem = question.itens.find(
                                (item) => item.item_order < lastAnswer.itens.item_order
                            );
                            selectedItemId = selectedItem?.id;
                        }
                        if (typeof selectedItem?.id != "number") {
                            selectedItemId = lastAnswer.item_fk;
                        }

                    } else {
                        console.log(lastAnswer?.itens)
                        selectedItemId = lastAnswer.item_fk;
                    }


                    console.log(selectedItemId);

                    if (selectedItemId) {
                        await prisma.answers.create({
                            data: {
                                avaliation_fk: newEvaluation.id,
                                question_fk: question.id,
                                item_fk: selectedItemId,
                                created_at: new Date(),
                            },
                        });

                    }
                }
            }
        }
    }
    console.log("--------------------------------------------------------");
    console.log("Relatório de Crise inserido com sucesso");
    console.log("responsible: ", responsible.email + " - senhaSegura123");
    console.log("professional: ", professional.email + " - senhaSegura123");
    console.log("--------------------------------------------------------");
}

main()
    .catch((e) => {
        console.error('Erro:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
