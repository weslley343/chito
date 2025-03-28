// Importa o cliente do Prisma para interagir com o banco de dados
import { PrismaClient } from '@prisma/client';
// Importa a função para criptografar senhas
import { encryptPassword } from '../../src/utils/encriptor';

// Cria uma instância do cliente do Prisma
const prisma = new PrismaClient();

async function main() {
    // Insere um responsável no banco de dados
    const responsible = await prisma.responsibles.create({
        data: {
            identifier: 'responsible1', // Identificador único
            full_name: 'João Silva', // Nome completo
            email: 'joao.silva@example.com', // Email
            password: await encryptPassword('senhaSegura123'), // Senha criptografada
            description: 'Responsável pelo acompanhamento.', // Descrição
            created_at: new Date(), // Data de criação
        },
    });

    // Insere um profissional no banco de dados
    const professional = await prisma.professionals.create({
        data: {
            identifier: 'professional1', // Identificador único
            full_name: 'Maria Oliveira', // Nome completo
            email: 'maria.oliveira@example.com', // Email
            password: await encryptPassword('senhaSegura123'), // Senha criptografada
            specialty: 'Psicólogo', // Especialidade
            description: 'Profissional especializado em psicologia infantil.', // Descrição
            created_at: new Date(), // Data de criação
        },
    });

    // Insere 30 usuários no banco de dados
    const names = ["Alice", "Miguel", "Sophia", "Arthur", "Helena", "Bernardo", "Valentina", "Heitor", "Laura", "Davi", "Isabella", "Lorenzo", "Manuela", "Théo", "Júlia", "Pedro", "Heloísa", "Gabriel", "Luiza", "Enzo", "Maria", "Matheus", "Lorena", "Lucas", "Lívia", "Benjamin", "Giovanna", "Nicolas", "Maria Eduarda", "Guilherme", "Beatriz"];
    const users = [];
    for (let i = 1; i <= 3; i++) {
        const user = await prisma.clients.create({
            data: {
                identifier: `user${i}${names[i]}`, // Identificador único
                full_name: `${names[i]}${i} Demo`, // Nome completo
                birthdate: new Date(2000, 0, i), // Data de nascimento fictícia
                gender: i % 2 === 0 ? 'male' : 'female', // Gênero alternado
                description: `Descrição do usuário ${i}`, // Descrição
                created_at: new Date(), // Data de criação
            },
        });
        users.push(user); // Adiciona o usuário à lista
    }

    // Associa os usuários ao profissional
    for (const user of users) {
        await prisma.client_professional.create({
            data: {
                client_fk: user.id, // Chave estrangeira do cliente
                professional_fk: professional.id, // Chave estrangeira do profissional
                created_at: new Date(), // Data de criação
            },
        });
    }

    // Busca a escala "ATEC" e suas perguntas e itens
    const atecScale = await prisma.scales.findFirst({
        where: { name: 'ATEC' }, // Filtra pela escala "ATEC"
        include: {
            questions: {
                include: {
                    itens: {
                        orderBy: {
                            item_order: 'desc', // Ordena os itens pelo campo "item_order" em ordem decrescente
                        },
                    },
                },
            },
        },
    });

    if (atecScale) {
        // console.log(`Escala "ATEC" encontrada: ${atecScale.name}`);
        // for (const question of atecScale.questions) {
        //     console.log(`Pergunta: ${question.content}`);
        //     for (const iten of question.itens) {
        //         console.log(`  Item: ${iten.content}`);
        //     }
        // }

        // Cria avaliações para cada usuário
        for (const user of users) {
            const evaluation = await prisma.avaliations.create({
                data: {
                    client_fk: user.id, // Chave estrangeira do cliente
                    scale_fk: atecScale.id, // Chave estrangeira da escala
                    professional_fk: professional.id, // Chave estrangeira do profissional
                    title: `Primeira Avaliação de ${user.full_name}`, // Título da avaliação
                    created_at: new Date(), // Data de criação
                },
            });
            console.log(`Avaliação criada para o usuário ${user.full_name}`);

            // Associa itens aleatórios às perguntas da avaliação
            for (const question of atecScale.questions) {
                const randomItem = question.itens[Math.floor(Math.random() * question.itens.length)];
                if (randomItem) {
                    await prisma.answers.create({
                        data: {
                            avaliation_fk: evaluation.id, // Chave estrangeira da avaliação
                            question_fk: question.id, // Chave estrangeira da pergunta
                            item_fk: randomItem.id, // Chave estrangeira do item
                            created_at: new Date(), // Data de criação
                        },
                    });
                }
            }
        }
    } else {
        console.log('Escala "ATEC" não encontrada.');
    }

    // Cria mais quatro avaliações para cada usuário
    for (const user of users) {
        for (let i = 1; i <= 1; i++) {
            // Busca a última avaliação do usuário
            const lastEvaluation = await prisma.avaliations.findFirst({
                where: { client_fk: user.id }, // Filtra pelo cliente
                orderBy: { created_at: 'desc' }, // Ordena pela data de criação (mais recente)
                include: {
                    answers: {
                        include: {
                            itens: true, // Inclui os itens sem ordenação
                        },
                    },
                },
            });


            if (lastEvaluation) {//caso a última avaliação seja encontrada
                const newEvaluation = await prisma.avaliations.create({
                    data: {
                        client_fk: user.id, // Chave estrangeira do cliente
                        scale_fk: atecScale ? atecScale.id : 0, // Chave estrangeira da escala
                        professional_fk: professional.id, // Chave estrangeira do profissional
                        title: `Avaliação ${i} de ${user.full_name}`, // Título da avaliação
                        created_at: new Date(), // Data de criação
                    },
                });


                // Associa itens às perguntas da nova avaliação com base na última avaliação
                for (const question of atecScale?.questions || []) {


                    // Busca a última resposta para a pergunta atual
                    const lastAnswer = lastEvaluation.answers.find(
                        (answer) => answer.question_fk === question.id
                    );

                    console.log(lastAnswer)
                    if (!lastAnswer?.itens) {
                        console.log("não tem itens")
                        break
                    }

                    // Sorteia verdadeiro ou falso para decidir a lógica de seleção do item
                    const randomResult = Math.random() < 0.2;
                    // const randomResult = true
                    let selectedItemId;
                    let selectedItem;
                    //EDICAO COMECA AQUI

                    //lastAnswer é um objeto com a úlitima resposta de um usuário para a pergunda em questão
                    //itens de lastAnswer contém apenas 1 item dentro do array que corresponde a resposta que o usuário deu para a pergunta

                    //question contém o conteúdo da questão que está sendo decidida a resposta
                    //question.itens contém todos os itens que estão disponíveis para a pergunta
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
                        // Cria uma nova resposta associando o item selecionado à nova avaliação
                        await prisma.answers.create({
                            data: {
                                avaliation_fk: newEvaluation.id, // Chave estrangeira da nova avaliação
                                question_fk: question.id, // Chave estrangeira da pergunta
                                item_fk: selectedItemId, // Chave estrangeira do item selecionado
                                created_at: new Date(), // Data de criação
                            },
                        });

                    }
                }
            }
        }
    }
}

// Executa a função principal e trata erros
main()
    .catch((e) => {
        console.error('Erro:', e);
    })
    .finally(async () => {
        await prisma.$disconnect(); // Desconecta do banco de dados
    });
