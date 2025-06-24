import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertCrisisReport() {
    // 1. Criar a escala "Relatório de Crise"
    const scale = await prisma.scales.create({
        data: {
            name: "CARS",
            description: "Escala de Avaliação do Autismo na Infância (Childhood Autism Rating Scale - CARS), composta por 15 itens que avaliam o comportamento da criança em diferentes domínios.",
            image_url: "/static/scales/cars.png"
        },
    });

    // 2. Criar as perguntas do relatório de crise
    const questions = [
        {
            item_order: 1,
            content: "RELAÇÕES PESSOAIS",
            color: "#1f77b4",
            domain: "Relações Pessoais",
            items: [
                {
                    item_order: 1, content: `1 - Nenhuma evidência de dificuldade ou anormalidade nas relações pessoais: O comportamento da criança é adequado à sua idade. Alguma timidez, nervosismo ou aborrecimento podem ser observados quando é dito à criança o que fazer, mas não em grau atípico.`, score: 1.0
                },
                { item_order: 2, content: "1.5", score: 1.5 },
                {
                    item_order: 3, content: `2 - Relações levemente anormais: A criança pode evitar olhar o adulto nos olhos, evitar o adulto ou ter uma reação exagerada se a interação é forçada, ser excessivamente tímido, não responder ao adulto como esperado ou agarrar-se ao pais um pouco mais que a maioria das crianças da mesma idade`, score: 2.0
                },
                { item_order: 4, content: "2.5", score: 2.5 },
                {
                    item_order: 5, content: `3 - Relações moderadamente anormais: Às vezes, a criança demonstra indiferença (parece ignorar o adulto). Outras vezes, tentativas persistentes e vigorosas são necessárias para se conseguir a atenção da criança. O contato iniciado pela criança é mínimo.`, score: 3.0
                },
                { item_order: 6, content: "3.5", score: 3.5 },
                {
                    item_order: 7, content: `Relações gravemente anormais: A criança está constantemente indiferente ou inconsciente ao que o adulto está fazendo. Ela quase nunca responde ou inicia contato com o adulto. Somente a tentativa mais persistente para atrair a atenção tem algum efeito.`, score: 4.0
                },
            ],
        },
        {
            item_order: 2,
            content: "IMITAÇÃO",
             color: "#ff7f0e",
            domain: "Imitação",
            items: [
                { item_order: 1, content: `1- Imitação adequada: A criança pode imitar sons, palavras e movimentos, os quais são adequados para o seu nível de habilidade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Imitação levemente anormal: Na maior parte do tempo, a criança imita comportamentos simples como bater palmas ou sons verbais isolados; ocasionalmente imita somente após estimulação ou com atraso.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Imitação moderadamente anormal: A criança imita apenas parte do tempo e requer uma grande dose de persistência ou ajuda do adulto; freqüentemente imita apenas após um tempo (com atraso).`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Imitação gravemente anormal: A criança raramente ou nunca imita sons, palavras ou movimentos mesmo com estímulo e assistência.`, score: 4.0 },
            ],
        },
        {
            item_order: 3,
            content: "RESPOSTA EMOCIONAL",
             color: "#2ca02c",
            domain: "Resposta Emocional",
            items: [
                { item_order: 1, content: `1 - Resposta emocional adequada à situação e à idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Resposta emocional levemente anormal: ocasionalmente apresenta tipo ou grau inadequado de resposta emocional.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Resposta emocional moderadamente anormal: reações inibidas ou excessivas, caretas, risos ou rigidez em situações inapropriadas.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Resposta emocional gravemente anormal: respostas raramente adequadas, humor difícil de alterar ou instável.`, score: 4.0 },
            ],
        },
        {
            item_order: 4,
            content: "USO CORPORAL",
            color: "#d62728",
            domain: "Uso Corporal",
            items: [
                { item_order: 1, content: `1 - Uso corporal adequado à idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Uso corporal levemente anormal: falta de jeito, pouca coordenação ou movimentos incomuns raros.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Uso corporal moderadamente anormal: movimentos estranhos com os dedos, postura peculiar, autoagressão, etc.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Uso corporal gravemente anormal: comportamentos intensos e persistentes, mesmo quando desencorajados.`, score: 4.0 },
            ],
        },
        {
            item_order: 5,
            content: "USO DE OBJETOS",
            color: "#9467bd",
            domain: "Uso de Objetos",
            items: [
                { item_order: 1, content: `1 - Uso e interesse adequados por brinquedos e objetos.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Uso levemente inadequado: interesse atípico ou brincadeira pueril.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Uso moderadamente inadequado: pouco interesse ou uso estranho dos objetos.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Uso gravemente inadequado: uso repetitivo, intenso e difícil de interromper.`, score: 4.0 },
            ],
        },
        {
            item_order: 6,
            content: "RESPOSTA A MUDANÇAS",
            color: "#8c564b",
            domain: "Resposta a Mudanças",
            items: [
                { item_order: 1, content: `1 - Resposta adequada à idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: relutância leve em mudar de atividade.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: resistência ativa, inflexibilidade.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: raiva extrema ou recusa em cooperar.`, score: 4.0 },
            ],
        },
        {
            item_order: 7,
            content: "RESPOSTA VISUAL",
            color: "#e377c2",
            domain: "Resposta Visual",
            items: [
                { item_order: 1, content: `1 - Resposta visual adequada à idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: interesse incomum por luzes ou espelhos, fixação ocasional.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: evita contato visual frequente ou fixa objetos de ângulos estranhos.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: evita constantemente olhar pessoas ou objetos.`, score: 4.0 },
            ],
        },
        {
            item_order: 8,
            content: "RESPOSTA AUDITIVA",
            color: "#7f7f7f",
            domain: "Resposta Auditiva",
            items: [
                { item_order: 1, content: `1 - Respostas auditivas adequadas à idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: ausência ou atraso ocasional na resposta a sons.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: ignora sons ou reage exageradamente a sons cotidianos.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: reações extremamente exageradas ou ausentes a qualquer som.`, score: 4.0 },
            ],
        },
        {
            item_order: 9,
            content: "RESPOSTA E USO DO PALADAR, OLFATO E TATO",
            color: "#bcbd22",
            domain: "Sensorial",
            items: [
                { item_order: 1, content: `1 - Uso e resposta normais para paladar, olfato e tato.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: coloca objetos na boca ou reage levemente a dor.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: reage muito ou pouco a estímulos sensoriais.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: cheira ou sente obsessivamente, ignora ou exagera em reações à dor.`, score: 4.0 },
            ],
        },
        {
            item_order: 10,
            content: "MEDO OU NERVOSISMO",
            color: "#17becf",
            domain: "Medo ou Nervosismo",
            items: [
                { item_order: 1, content: `1 - Medo ou nervosismo normais para a idade.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: demonstra muito ou pouco medo ocasionalmente.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: reações muito intensas ou ausentes a situações que causam medo.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: medos persistentes e intensos ou falta de resposta a riscos.`, score: 4.0 },
            ],
        },
        {
            item_order: 11,
            content: "COMUNICAÇÃO VERBAL",
            color: "#f781bf",
            domain: "Comunicação Verbal",
            items: [
                { item_order: 1, content: `1 - Comunicação verbal normal, adequada à idade e à situação.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: atraso global, com alguma ecolalia ou inversão pronominal.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: fala ausente ou mistura de fala significativa com linguagem peculiar.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: ausência de fala significativa, emissão de sons bizarros ou uso incomum de palavras/frases.`, score: 4.0 },
            ],
        },
        {
            item_order: 12,
            content: "COMUNICAÇÃO NÃO VERBAL",
            color: "#a65628",
            domain: "Comunicação Não Verbal",
            items: [
                { item_order: 1, content: `1 - Uso normal da comunicação não-verbal, adequado à idade e situação.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: uso imaturo, gestos vagos ou pouco específicos.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: dificuldade para expressar ou compreender gestos.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: uso de gestos sem sentido, ausência de entendimento da linguagem corporal alheia.`, score: 4.0 },
            ],
        },
        {
            item_order: 13,
            content: "NÍVEL DE ATIVIDADE",
            domain: "Atividade",
            color: "#999999",
            items: [
                { item_order: 1, content: `1 - Nível de atividade normal para a idade e circunstâncias.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: um pouco irrequieta ou lenta, com impacto mínimo.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: hiperatividade significativa ou letargia frequente.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: extremos de atividade ou alternância entre hiperatividade e inatividade.`, score: 4.0 },
            ],
        },
        {
            item_order: 14,
            content: "NÍVEL E CONSISTÊNCIA DA RESPOSTA INTELECTUAL",
            color: "#66c2a5",
            domain: "Resposta Intelectual",
            items: [
                { item_order: 1, content: `1 - Inteligência normal e consistente em várias áreas.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Levemente anormal: abaixo do esperado para a idade, mas com habilidades relativamente estáveis.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Moderadamente anormal: abaixo do esperado, mas com desempenho próximo do normal em algumas áreas.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Gravemente anormal: desempenho geralmente inferior, mas pode superar crianças típicas em áreas isoladas.`, score: 4.0 },
            ],
        },
        {
            item_order: 15,
            content: "IMPRESSÕES GERAIS",
            color:  "#fc8d62",
            domain: "Impressão Clínica",
            items: [
                { item_order: 1, content: `1 - Sem autismo: nenhum dos sintomas característicos do autismo está presente.`, score: 1.0 },
                { item_order: 2, content: `1.5`, score: 1.5 },
                { item_order: 3, content: `2 - Autismo leve: pequeno número de sintomas ou intensidade leve.`, score: 2.0 },
                { item_order: 4, content: `2.5`, score: 2.5 },
                { item_order: 5, content: `3 - Autismo moderado: presença de vários sintomas ou intensidade moderada.`, score: 3.0 },
                { item_order: 6, content: `3.5`, score: 3.5 },
                { item_order: 7, content: `4 - Autismo grave: sintomas numerosos ou intensidade extrema.`, score: 4.0 },
            ],
        },

        //--------------------------------------------------------------------------------------------------------
        // {
        //     item_order: 1,
        //     content: "RELAÇÕES PESSOAIS",
        //     domain: "Relações Pessoais",
        //     items: [
        //         {
        //             item_order: 1, content: `1 - Nenhuma evidência de dificuldade ou anormalidade nas relações pessoais: O comportamento da criança é adequado à sua idade. Alguma timidez, nervosismo ou aborrecimento podem ser observados quando é dito à criança o que fazer, mas não em grau atípico.`, score: 1.0
        //         },
        //         { item_order: 2, content: "1.5", score: 1.5 },
        //         {
        //             item_order: 3, content: `2 - Relações levemente anormais: A criança pode evitar olhar o adulto nos olhos, evitar o adulto ou ter uma reação exagerada se a interação é forçada, ser excessivamente tímido, não responder ao adulto como esperado ou agarrar-se ao pais um pouco mais que a maioria das crianças da mesma idade`, score: 2.0
        //         },
        //         { item_order: 4, content: "2.5", score: 2.5 },
        //         {
        //             item_order: 5, content: `3 - Relações moderadamente anormais: Às vezes, a criança demonstra indiferença (parece ignorar o adulto). Outras vezes, tentativas persistentes e vigorosas são necessárias para se conseguir a atenção da criança. O contato iniciado pela criança é mínimo.`, score: 3.0
        //         },
        //         { item_order: 6, content: "3.5", score: 3.5 },
        //         {
        //             item_order: 7, content: `Relações gravemente anormais: A criança está constantemente indiferente ou inconsciente ao que o adulto está fazendo. Ela quase nunca responde ou inicia contato com o adulto. Somente a tentativa mais persistente para atrair a atenção tem algum efeito.`, score: 4.0
        //         },
        //     ],
        // },
        // {
        //     item_order: 2,
        //     content: "IMITAÇÃO",
        //     domain: "Imitação",
        //     items: [
        //         { item_order: 1, content: `1- Imitação adequada: A criança pode imitar sons, palavras e movimentos, os quais são adequados para o seu nível de habilidade.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Imitação levemente anormal: Na maior parte do tempo, a criança imita comportamentos simples como bater palmas ou sons verbais isolados; ocasionalmente imita somente após estimulação ou com atraso.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Imitação moderadamente anormal: A criança imita apenas parte do tempo e requer uma grande dose de persistência ou ajuda do adulto; freqüentemente imita apenas após um tempo (com atraso).`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Imitação gravemente anormal: A criança raramente ou nunca imita sons, palavras ou movimentos mesmo com estímulo e assistência.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 3,
        //     content: "RESPOSTA EMOCIONAL",
        //     domain: "Resposta Emocional",
        //     items: [
        //         { item_order: 1, content: `1 - Resposta emocional adequada à situação e à idade: A criança demonstra tipo e grau adequados de resposta emocional, indicada por uma mudança na expressão facial, postura e conduta.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Resposta emocional levemente anormal: A criança ocasionalmente apresenta um tipo ou grau inadequados de resposta emocional. As vezes, suas reações não estão relacionadas a objetos ou a eventos ao seu redor.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Resposta emocional moderadamente anormal: A criança demonstra sinais claros de resposta emocional inadequada (tipo ou grau). As reações podem ser bastante inibidas ou excessivas e sem relação com a situação; pode fazer caretas, rir ou tornar-se rígida até mesmo quando não estejam presentes objetos ou eventos produtores de emoção.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Resposta emocional gravemente anormal: As respostas são raramente adequadas a situação. Uma vez que a criança atinja um determinado humor, é muito difícil alterá-lo. Por outro lado, a criança pode demonstrar emoções diferentes quando nada mudou.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 4,
        //     content: "USO CORPORAL",
        //     domain: "Uso Corporal",
        //     items: [
        //         { item_order: 1, content: `1 - Uso corporal adequado à idade: A criança move-se com a mesma facilidade, agilidade e coordenação de uma criança normal da mesma idade.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Uso corporal levemente anormal: Algumas peculiaridades podem estar presentes, tais como falta de jeito, movimentos repetitivos, pouca coordenação ou a presença rara de movimentos incomuns`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Uso corporal moderadamente anormal: Comportamentos que são claramente estranhos ou incomuns para uma criança desta idade podem incluir movimentos estranhos com os dedos, postura peculiar dos dedos ou corpo, olhar fixo, beliscar o corpo, auto-agressão, balanceio, girar ou caminhar nas pontas dos pés.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Uso corporal gravemente anormal: Movimentos intensos ou freqüentes do tipo listado acima são sinais de uso corporal gravemente anormal. Estes comportamentos podem persistir apesar das tentativas de desencorajar as crianças a fazê-los ou de envolver a criança em outras atividades.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 5,
        //     content: "USO DE OBJETOS",
        //     domain: "Uso de Objetos",
        //     items: [
        //         { item_order: 1, content: `1 - Uso e interesse adequados por brinquedos e outros objetos: A criança demonstra interesse normal por brinquedos e outros objetos adequados para o seu nível de habilidade e os utiliza de maneira adequada.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Uso e interesse levemente inadequados por brinquedos e outros objetos: A criança pode demonstrar um interesse atípico por um brinquedo ou brincar com ele de forma inadequada, de um modo pueril (exemplo: batendo ou sugando o brinquedo)`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Uso e interesse moderadamente inadequados por brinquedos e outros objetos: A criança pode demonstrar pouco interesse por brinquedos ou outros objetos, ou pode estar preocupada em usá-los de maneira estranha. Ela pode concentrar-se em alguma parte insignificante do brinquedo, tornar-se fascinada com a luz que reflete do mesmo, repetitivamente mover alguma parte do objeto ou exclusivamente brincar com ele.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Uso e interesse gravemente inadequados por brinquedos e outros objetos: A criança pode engajar-se nos mesmos comportamentos citados acima, porém com maior freqüência e intensidade. É difícil distrair a criança quando ela está engajada nestas atividades inadequadas.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 6,
        //     content: "RESPOSTA A MUDANÇAS",
        //     domain: "Resposta a Mudanças",
        //     items: [
        //         { item_order: 1, content: `1 - Respostas à mudança adequadas a idade: Embora a criança possa perceber ou comentar as mudanças na rotina, ela é capaz de aceitar estas mudanças sem angústia excessiva.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Respostas à mudança adequadas à idade levemente anormal: Quando um adulto tenta mudar tarefas, a criança pode continuar na mesma atividade ou usar os mesmos materiais.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Respostas à mudança adequadas à idade moderadamente anormal: A criança resiste ativamente a mudanças na rotina, tenta continuar sua antiga atividade e é difícil de distraí-la. Ela pode tornar-se infeliz e zangada quando uma rotina estabelecida é alterada.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Respostas à mudança adequadas à idade gravemente anormal: A criança demonstra reações graves às mudanças. Se uma mudança é forçada, ela pode tornar-se extremamente zangada ou não disposta a ajudar e responder com acessos de raiva.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 7,
        //     content: "RESPOSTA VISUAL",
        //     domain: "Resposta Visual",
        //     items: [
        //         { item_order: 1, content: `1 - Resposta visual adequada: O comportamento visual da criança é normal e adequado para sua idade. A visão é utilizada em conjunto com outros sentidos como forma de explorar um objeto novo.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Resposta visual levemente anormal: A criança precisa, ocasionalmente, ser lembrada de olhar para os objetos. A criança pode estar mais interessada em olhar espelhos ou luzes do que o fazem seus pares, pode ocasionalmente olhar fixamente para o espaço, ou pode evitar olhar as pessoas nos olhos.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Resposta visual moderadamente anormal: A criança deve ser lembrada freqüentemente de olhar para o que está fazendo, ela pode olhar fixamente para o espaço, evitar olhar as pessoas nos olhos, olhar objetos de um ângulo incomum ou segurar os objetos muito próximos aos olhos.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Resposta visual gravemente anormal: A criança evita constantemente olhar para as pessoas ou para certos objetos e pode demonstrar formas extremas de outras peculiaridades visuais descritas acima.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 8,
        //     content: "RESPOSTA AUDITIVA",
        //     domain: "Resposta Auditiva",
        //     items: [
        //         { item_order: 1, content: `1 - Respostas auditivas adequadas para a idade: O comportamento auditivo da criança é normal e adequado para idade. A audição é utilizada junto com outros sentidos.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Respostas auditivas levemente anormal: Pode haver ausência de resposta ou uma resposta levemente exagerada a certos sons. Respostas a sons podem ser atrasadas e os sons podem necessitar de repetição para prender a atenção da criança. A criança pode ser distraída por sons externos.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Respostas auditivas moderadamente anormal: As repostas da criança aos sons variam. Freqüentemente ignora o som nas primeiros vezes em que é feito. Pode assustar-se ou cobrir as orelhas ao ouvir alguns sons do cotidiano.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Respostas auditivas gravemente anormal: A criança reage exageradamente e/ou ou despreza sons num grau extremamente significativo, independente do tipo de som.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 9,
        //     content: "RESPOSTA E USO DO PALADAR, OLFATO E TATO",
        //     domain: "Sensorial",
        //     items: [
        //         { item_order: 1, content: `1 - Uso e reposta normais do paladar, olfato e tato: A criança explora novos objetos de um modo adequado a sua idade, geralmente sentindo ou olhando. Paladar ou olfato podem ser usados quando adequados. Ao reagir a pequenas dores do dia-a-dia, a criança expressa desconforto mas não reage exageradamente.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Uso e reposta levemente anormais do paladar, olfato e tato: A criança pode persistir em colocar objetos na boca; pode cheirar ou provar/experimentar objetos não comestíveis. Pode ignorar ou ter reação levemente exagerada à uma dor mínima, para a qual uma criança normal expressaria somente desconforto.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Uso e resposta moderadamente anormais do paladar, olfato e tato: A criança pode estar moderadamente preocupada em tocar, cheirar ou provar objetos ou pessoas. A criança pode reagir demais ou muito pouco.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Uso e resposta gravemente anormais do paladar, olfato e tato: A criança está preocupada em cheirar, provar e sentir objetos, mais pela sensação do que pela exploração ou uso normal dos objetos. A criança pode ignorar completamente a dor ou reagir muito fortemente a desconfortos leves.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 10,
        //     content: "MEDO OU NERVOSISMO",
        //     domain: "Medo ou Nervosismo",
        //     items: [
        //         { item_order: 1, content: `1 - Medo ou nervosismo normais: O comportamento da criança é adequado tanto à situação quanto à idade`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Medo ou nervosismo levemente anormais: A criança ocasionalmente demonstra muito ou pouco medo ou nervosismo quando comparada às reações de uma criança normal da mesma idade e em situação semelhante.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Medo ou nervosismo moderadamente anormais: A criança demonstra bastante mais ou bastante menos medo do que seria típico para uma criança mais nova ou mais velha em uma situação similar.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Medo ou nervosismo gravemente anormais: Medos persistem mesmo após experiências repetidas com eventos ou objetos inofensivos. É extremamente difícil acalmar ou confortar a criança. A criança pode, por outro lado, falhar em demonstrar consideração adequada aos riscos que outras crianças da mesma idade evitam.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 11,
        //     content: "COMUNICAÇÃO VERBAL",
        //     domain: "Comunicação Verbal",
        //     items: [
        //         { item_order: 1, content: `1 - Comunicação verbal normal, adequada a idade e à situação.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Comunicação verbal levemente anormal: A fala demonstra um atraso global. A maior parte do discurso tem significado; porém, alguma ecolalia ou inversão pronominal podem ocorrer. Algumas palavras peculiares ou jargões podem ser usados ocasionalmente.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Comunicação verbal moderadamente anormal: A fala pode estar ausente. Quando presente, a comunicação verbal pode ser uma mistura de alguma fala significativa e alguma linguagem peculiar, tais como jargão, ecolalia ou inversão pronominal. As peculiaridades na fala significativa podem incluir questionamentos excessivos ou preocupação com algum tópico em particular.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Comunicação verbal gravemente anormal: Fala significativa não é utilizada. A criança pode emitir gritos estridentes e infantis, sons animais ou bizarros, barulhos complexos semelhantes à fala, ou pode apresentar o uso bizarro e persistente de algumas palavras reconhecíveis ou frases.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 12,
        //     content: "COMUNICAÇÃO NÃO VERBAL",
        //     domain: "Comunicação Não Verbal",
        //     items: [
        //         { item_order: 1, content: `1 - Uso normal da comunicação não-verbal adequado à idade e situação`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Uso da comunicação não-verbal levemente anormal: Uso imaturo da comunicação não-verbal; a criança pode somente apontar vagamente ou esticar-se para alcançar o que quer, nas mesmas situações nas quais uma criança da mesma idade pode apontar ou gesticular mais especificamente para indicar o que deseja.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Uso da comunicação não-verbal moderadamente anormal: A criança geralmente é incapaz de expressar suas necessidades ou desejos de forma não verbal, e não consegue compreender a comunicação não-verbal dos outros.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Uso da comunicação não-verbal gravemente anormal: A criança utiliza somente gestos bizarros ou peculiares, sem significado aparente, e não demonstra nenhum conhecimento do significados associados aos gestos ou expressões faciais dos outros.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 13,
        //     content: "NÍVEL DE ATIVIDADE",
        //     domain: "Atividade",
        //     items: [
        //         { item_order: 1, content: `1 - Nível de atividade normal para a idade e circunstâncias.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Nível de atividade levemente anormal: A criança pode tanto ser um pouco irrequieta quanto um pouco ―preguiçosa‖ , apresentando, algumas vezes, movimentos lentos. O nível de atividade da criança interfere apenas levemente no seu desempenho.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Nível de atividade moderadamente anormal: A criança pode ser bastante ativa e difícil de conter. Ela pode ter uma energia ilimitada ou pode não ir prontamente para a cama à noite. Por outro lado, a criança pode ser bastante letárgica e necessitar de um grande estímulo para mover-se.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Nível de atividade gravemente anormal: A criança exibe extremos de atividade ou inatividade e pode até mesmo mudar de um extremo ao outro.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 14,
        //     content: "NÍVEL E CONSISTÊNCIA DA RESPOSTA INTELECTUAL",
        //     domain: "Resposta Intelectual",
        //     items: [
        //         { item_order: 1, content: `1 - A inteligência é normal e razoavelmente consistente em várias áreas: A criança é tão inteligente quanto crianças típicas da mesma idade e não tem qualquer habilidade intelectual ou problemas incomuns.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Funcionamento intelecual levemente anormal: A criança não é tão inteligente quanto crianças típicas da mesma idade; as habilidades apresentam-se razoavelmente regulares através de todas as áreas.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Funcionamento intelectual moderadamente anormal: Em geral, a criança não é tão inteligente quanto uma típica criança da mesma idade, porém, a criança pode funcionar próximo do normal em uma ou mais áreas intelectuais.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Funcionamento intelectual gravemente anormal: Embora a criança geralmente não seja tão inteligente quanto uma criança típica da mesma idade, ela pode funcionar até mesmo melhor que uma criança normal da mesma idade em uma ou mais áreas.`, score: 4.0 },
        //     ],
        // },
        // {
        //     item_order: 15,
        //     content: "IMPRESSÕES GERAIS",
        //     domain: "Impressão Clínica",
        //     items: [
        //         { item_order: 1, content: `1 - Sem autismo: a criança não apresenta nenhum dos sintomas característicos do autismo.`, score: 1.0 },
        //         { item_order: 2, content: `1.5`, score: 1.5 },
        //         { item_order: 3, content: `2 - Autismo leve: A criança apresenta somente um pequeno número de sintomas ou somente um grau leve de autismo.`, score: 2.0 },
        //         { item_order: 4, content: `2.5`, score: 2.5 },
        //         { item_order: 5, content: `3 - Autismo moderado: A criança apresenta muitos sintomas ou um grau moderado de autismo.`, score: 3.0 },
        //         { item_order: 6, content: `3.5`, score: 3.5 },
        //         { item_order: 7, content: `4 - Autismo grave: a criança apresenta inúmeros sintomas ou um grau extremo de autismo`, score: 4.0 },
        //     ],
        // },
    ];

    // 3. Criar as perguntas e itens associados
    for (const question of questions) {
        const createdQuestion = await prisma.questions.create({
            data: {
                item_order: question.item_order,
                color: question.color,
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

    console.log("CARS inserido com sucesso");
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

