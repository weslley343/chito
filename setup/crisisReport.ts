import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertCrisisReport() {
    // 1. Criar a escala "Relatório de Crise"
    const scale = await prisma.scales.create({
        data: {
            name: "Relatório de Crise",
            description: "Escala utilizada para catalogar uma situação de crise desde a última secção.",
            image_url: "/static/scales/crisis_report.png"
        },
    });

    // 2. Criar as perguntas do relatório de crise
    const questions = [
        {
            item_order: 1,
            content: "A crise tem motivo conhecido?",
            domain: "Motivo",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 2,
            content: "A crise está relacionada a algum dos seguintes domínios?",
            domain: "Domínio",
            items: [
                { item_order: 1, content: "Comportamental", score: 1.0 },
                { item_order: 2, content: "Emocional", score: 2.0 },
                { item_order: 3, content: "Físico", score: 3.0 },
                { item_order: 4, content: "Cognitivo", score: 4.0 },
            ],
        },
        {
            item_order: 3,
            content: "Há risco de aproveitamento da secção em decorrência do evento?",
            domain: "Secção",
            items: [
                { item_order: 1, content: "Sim", score: 5.0 },
                { item_order: 3, content: "Sim, pouco.", score: 3.0 },
                { item_order: 5, content: "Não", score: 1.0 },
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
        } else {
            console.error(e);

        }

    })
    .finally(async () => {
        await prisma.$disconnect();
    });
