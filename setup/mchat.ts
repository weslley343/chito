import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertCrisisReport() {
    // 1. Criar a escala "Relatório de Crise"
    const scale = await prisma.scales.create({
        data: {
            name: "M Chat",
            description: "O (M-CHAT) é um breve questionário referente ao desenvolvimento e comportamento utilizado em crianças dos 16 aos 30 meses, com o objectivo de rastrear as perturbações do espectro do autismo (PEA).",
            image_url: "/static/scales/mchat.png"
        },
    });

    // 2. Criar as perguntas do relatório de crise
    const questions = [
        {
            item_order: 1,
            content: "Gosta de brincar ao colo fazendo de “cavalinho”, etc.?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 2,
            content: "Interessa-se pelas outras crianças?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 3,
            content: "Gosta de subir objectos, como por exemplo, cadeiras, mesas?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 4,
            content: "Gosta de jogar às escondidas?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 5,
            content: "Brinca ao faz-de-conta, por exemplo, falar ao telefone ou dar de comer a uma boneca, etc.?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 6,
            content: "Aponta com o indicador para pedir alguma coisa?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 7,
            content: "Aponta com o indicador para mostrar interesse em alguma coisa?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 8,
            content: "Brinca apropriadamente com brinquedos (carros ou Legos) sem levá-los à boca, abanar ou deitá-los ao chão?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 9,
            content: "Alguma vez lhe trouxe objectos (brinquedos) para lhe mostrar alguma coisa?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 10,
            content: "A criança mantém contacto visual por mais de um ou dois segundos?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 11,
            content: "É muito sensível aos ruídos (ex. tapa os ouvidos)?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },

        {
            item_order: 12,
            content: "Sorri como resposta às suas expressões faciais ou ao seu sorriso?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 13,
            content: "Imita o adulto (ex. faz uma careta e ela imita)?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 14,
            content: "Responde/olha quando o(a) chamam pelo nome?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 15,
            content: "Se apontar para um brinquedo do outro lado da sala, a criança acompanha com o olhar?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 16,
            content: "Já anda?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 17,
            content: "Olha para as coisas para as quais o adulto está a olhar?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 18,
            content: "Faz movimentos estranhos com as mãos/dedos próximo da cara?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },

        {
            item_order: 19,
            content: "Tenta chamar a sua atenção para o que está a fazer?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 20,
            content: "Alguma vez se preocupou quanto à sua audição?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },

        {
            item_order: 21,
            content: "Compreende o que as pessoas lhe dizem?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },

        {
            item_order: 22,
            content: "Por vezes fica a olhar para o vazio ou deambula ao acaso pelos espaços?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },


        {
            item_order: 23,
            content: "Procura a sua reacção facial quando se vê confrontada com situações desconhecidas?",
            domain: "Pontuação",
            items: [
                { item_order: 1, content: "Sim", score: 0.0 },
                { item_order: 2, content: "Não", score: 1.0 },
            ],
        },
    ];

    // 3. Criar as perguntas e itens associados
    for (const question of questions) {
        const createdQuestion = await prisma.questions.create({
            data: {
                item_order: question.item_order,
                content: question.content,
                domain: question.domain,
                scale_fk: scale.id, // Relacionar com a escala "Relatório de Crise"
            },
        });

        // Criar os itens específicos para cada pergunta
        for (const item of question.items) {
            await prisma.itens.create({
                data: {
                    item_order: item.item_order,
                    content: item.content,
                    score: item.score,
                    question_fk: createdQuestion.id, // Relacionar com a pergunta específica
                },
            });
        }
    }

    console.log("Relatório de Crise inserido com sucesso");
}

insertCrisisReport()
    .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle unique constraint violation
            if (e.code === 'P2002') {
                //const targetField = e.meta?.target || 'unknown field';
                console.error(`ERR: Test Already exist in the database - Dont worry, this error is prety normal during updates`);
            }
        }
        else {
            console.error(e);
        }

    })
    .finally(async () => {
        await prisma.$disconnect();
    });
