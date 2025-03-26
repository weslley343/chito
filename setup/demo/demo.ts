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
    // console.log(`Responsável inserido: ${responsible.full_name}`);

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
    // console.log(`Profissional inserido: ${professional.full_name}`);

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
        console.log(`Usuário inserido: ${user.full_name}`);
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
        console.log(`Usuário ${user.full_name} associado ao profissional ${professional.full_name}`);
    }

    // Busca a escala "ATEC" e suas perguntas e itens
    const atecScale = await prisma.scales.findFirst({
        where: { name: 'ATEC' }, // Filtra pela escala "ATEC"
        include: {
            questions: {
                include: {
                    itens: true, // Inclui os itens de cada pergunta
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
                    //console.log(`Item "${randomItem.content}" associado à avaliação do usuário ${user.full_name}`);
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
                            itens: true, // Inclui os itens das respostas
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

                    // Sorteia verdadeiro ou falso para decidir a lógica de seleção do item
                    const randomResult = Math.random() < 0.5;
                    let selectedItem;

                    if (randomResult && lastAnswer) {
                        // Seleciona um item com score menor que o da última resposta, se possível
                        selectedItem = question.itens.find(
                            (item) =>
                                item.score !== null &&
                                lastAnswer.itens.score !== null &&
                                item.score < lastAnswer.itens.score
                        );
                    } 
                    
                    if (!selectedItem && lastAnswer) {
                        // Se não encontrou um item com score menor, seleciona um item com score igual ao da última resposta
                        selectedItem = question.itens.find(
                            (item) => item.score === lastAnswer.itens.score
                        );
                    }

                    if (!selectedItem) {
                        // Se ainda não encontrou, seleciona o primeiro item disponível como fallback
                        selectedItem = question.itens[0];
                    }

                    console.log(selectedItem);

                    if (selectedItem) {
                        // Cria uma nova resposta associando o item selecionado à nova avaliação
                        await prisma.answers.create({
                            data: {
                                avaliation_fk: newEvaluation.id, // Chave estrangeira da nova avaliação
                                question_fk: question.id, // Chave estrangeira da pergunta
                                item_fk: selectedItem.id, // Chave estrangeira do item selecionado
                                created_at: new Date(), // Data de criação
                            },
                        });
                        console.log(
                            `Item "${selectedItem.content}" associado à avaliação ${i} do usuário ${user.full_name}`
                        );
                    }

                     //esse loop está okay
                     console.log(`Pergunta: ${question.item_order}`);
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
