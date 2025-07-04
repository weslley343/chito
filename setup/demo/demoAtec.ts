import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../src/utils/encriptor';

const prisma = new PrismaClient();

async function main() {

    const responsible = await prisma.responsibles.create({
        data: {
            identifier: 'amandasilva123',
            full_name: 'Amanda Montenegro Silva',
            email: 'amanda@acompanhar.com',
            password: await encryptPassword('senhaSegura123'),
            description: 'Responsável pelo acompanhamento.',
            created_at: new Date(),
        },
    });

    const professional = await prisma.professionals.create({
        data: {
            identifier: 'ameliasantos123',
            full_name: 'Amelia Oliveira Santos',
            email: 'amelia@acompanhar.com',
            password: await encryptPassword('senhaSegura123'),
            specialty: 'Fisioterapeuta',
            description: 'Profissional especializado em psicologia infantil.',
            created_at: new Date(),
        },
    });

    // Insere 30 usuários no banco de dados

    const names = [
        "Alice", "Antonio", "Ana", "Arthur", "Amanda", "Augusto",
        "Aline", "André", "Adriana", "Alex", "Alessandra", "Alan",
        "Amélia", "Adriano", "Aurora", "Ariano", "Alana", "Antony",
        "Aída", "Axel", "Ariane", "Afonso", "Aurelia", "Abel",
        "Angelina", "Alberto", "Agnese", "Agenor", "Ayumi", "Anselmo"
    ];

    const users = [];
    // Cria 3 usuários
    for (let i = 1; i <= 15; i++) {//alterar o 3 para mudar a quantidade de usuários criados. OBS: Max de 30 usuários
        const user = await prisma.clients.create({
            data: {
                identifier: `${names[i]}`,//user${i}-
                full_name: `${names[i]} Adelino Silva`,//${i} 
                birthdate: new Date(2000, 0, i),
                code: `ATEC${i}`,
                image_url: `/static/clientwomanyellow.png`,
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

    // Busca a escala "ATEC" e suas perguntas e itens
    const atecScale = await prisma.scales.findFirst({
        where: { name: 'ATEC' }, // Alterar aqui para mudar a escala
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

    if (atecScale) {

        // Cria avaliações para cada usuário
        for (const user of users) {
            const evaluation = await prisma.avaliations.create({
                data: {
                    client_fk: user.id,
                    scale_fk: atecScale.id,
                    professional_fk: professional.id,
                    title: `Primeira Avaliação de ${user.full_name}`,
                    created_at: new Date(),
                },
            });
            console.log(`Avaliação criada para o usuário ${user.full_name}`);

            // Adiciona respostas aleatórias para cada pergunta da primeira avaliação
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
                }
            }
        }
    } else {
        console.log('Escala "ATEC" não encontrada.');
    }

    //Cria mais 3 avaliações além da primeira
    for (const user of users) {
        for (let i = 2; i <= 12; i++) { //editar 4 para alterar o número de avaliações
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
                        scale_fk: atecScale ? atecScale.id : 0,
                        professional_fk: professional.id,
                        title: `Avaliação ${i} de ${user.full_name}`,
                        created_at: new Date(),
                    },
                });



                for (const question of atecScale?.questions || []) {



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
    console.log("ATEC inserido com sucesso");
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
