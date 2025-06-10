import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertCrisisReport() {
    // 1. Criar a escala "Relatório de Crise"
    const scale = await prisma.scales.create({
        data: {
            name: "Autism Behavior Checklist",
            color: "#a3c0ef",
            description: "Protocolo de registro do Inventário de Comportamentos Autísticos (ICA)",
            image_url: "/static/scales/abc.png"
        },
    });

    // 2. Criar as perguntas do relatório de crise
    const questions = [
        {
            item_order: 1,
            content: "Gira em torno de si por longo período de tempo",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 2,
            content: "Aprende uma tarefa, mas esquece rapidamente",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 3,
            content: "É raro atender estímulo não verbal social/ambiente (expressões, gestos, situações)",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 4,
            content: "Ausência de resposta para solicitações verbais - venha cá; sente-se",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 5,
            content: "Usa brinquedos inapropriadamente",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 6,
            content: "Pobre uso da discriminação visual (fixa uma característica do objeto)",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 7,
            content: "Ausência do sorriso social",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 8,
            content: "Uso inadequado de pronomes (eu por ele)",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 9,
            content: "Insiste em manter certos objetos consigo",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 10,
            content: "Parece não escutar (suspeita-se de perda de audição)",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 11,
            content: "Fala monótona e sem ritmo",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 12,
            content: "Balança-se por longos períodos de tempo",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 13,
            content: "Não estende o braço para ser pego (nem o fez quando bebê)",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 14,
            content: "Fortes reações frente a mudanças no ambiente",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 15,
            content: "Ausência de atenção ao seu nome quando entre 2 outras crianças",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 16,
            content: "Corre interrompendo com giros em torno de si, balanceio de mãos",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 17,
            content: "Ausência de resposta para expressão facial/sentimento de outros",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 18,
            content: "Raramente usa 'sim' ou 'eu'",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 19,
            content: "Possui habilidade numa área do desenvolvimento",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 20,
            content: "Ausência de respostas a solicitações verbais envolvendo o uso de referenciais de espaço",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 21,
            content: "Reação de sobressalto a som intenso (suspeita de surdez)",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 22,
            content: "Balança as mãos",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 23,
            content: "Intensos acessos de raiva e/ou frequentes 'chiliques'",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 24,
            content: "Evita ativamente o contato visual",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 25,
            content: "Resiste ao toque / ao ser pego / ao carinho",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 26,
            content: "Não reage a estímulos dolorosos",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 27,
            content: "Difícil e rígido no colo (ou foi quando bebê)",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 28,
            content: "Flácido quando no colo",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 29,
            content: "Aponta para indicar objeto desejado",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 30,
            content: "Anda nas pontas dos pés",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 31,
            content: "Machuca outros mordendo, batendo, etc",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 32,
            content: "Repete a mesma frase muitas vezes",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 33,
            content: "Ausência de imitação de brincadeiras de outras crianças",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 34,
            content: "Ausência de reação do piscar quando luz forte incide em seus olhos",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 35,
            content: "Machuca-se mordendo, batendo a cabeça, etc",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 36,
            content: "Não espera para ser atendido (quer as coisas imediatamente)",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 37,
            content: "Não aponta para mais que cinco objetos",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 38,
            content: "Dificuldade de fazer amigos",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 39,
            content: "Tapa as orelhas para vários sons",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 40,
            content: "Gira, bate objetos muitas vezes",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 41,
            content: "Dificuldade para o treino de toalete",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 42,
            content: "Usa de 0 a 5 palavras/dia para indicar necessidades e o que quer",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 43,
            content: "Frequentemente muito ansioso ou medroso",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 44,
            content: "Franze, cobre ou vira os olhos quando em presença de luz natural",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 45,
            content: "Não se veste sem ajuda",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 46,
            content: "Repete constantemente as mesmas palavras e/ou sons",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 47,
            content: "'Olha através' das pessoas",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 48,
            content: "Repete perguntas e frases ditas por outras pessoas",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 49,
            content: "Frequentemente inconsciente dos perigos de situações e do ambiente",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 50,
            content: "Prefere manipular e ocupar-se com objetos inanimados",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 51,
            content: "Toca, cheira ou lambe objetos do ambiente",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 52,
            content: "Frequentemente não reage visualmente à presença de novas pessoas",
            domain: "Relacionamento (RE)",
            color: "#64b0cc",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 53,
            content: "Repete sequências de comportamentos complicados (cobrir coisas, por ex.)",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 54,
            content: "Destrutivo com seus brinquedos e coisas da família",
            domain: "Uso do corpo e de objetos (CO)",
            color: "#a6f2a2",
            items: [
                { item_order: 1, content: "Sim", score: 2.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 55,
            content: "O atraso no desenvolvimento identificado antes dos 30 meses",
            domain: "Desenvolvimento pessoal e social (PS)",
            color: "#d6589d",
            items: [
                { item_order: 1, content: "Sim", score: 1.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 56,
            content: "Usa mais que 15 e menos que 30 frases diárias para comunicar-se",
            domain: "Linguagem (LG)",
            color: "#fcff59",
            items: [
                { item_order: 1, content: "Sim", score: 3.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        },
        {
            item_order: 57,
            content: "Olha fixamente o ambiente por longos períodos de tempo",
            domain: "Estímulo sensorial (ES)",
            color: "#7e5a96",
            items: [
                { item_order: 1, content: "Sim", score: 4.0 },
                { item_order: 2, content: "Não", score: 0.0 },
            ],
        }
    ];

    // 3. Criar as perguntas e itens associados
    for (const question of questions) {
        const createdQuestion = await prisma.questions.create({
            data: {
                item_order: question.item_order,
                content: question.content,
                domain: question.domain,
                color: question.color,
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

    console.log("ABC inserido com sucesso");
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
