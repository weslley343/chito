import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertCrisisReport() {
    // 1. Criar a escala "Relatório de Crise"
    const scale = await prisma.scales.create({
        data: {
            name: "ATEC",
            description: "Avaliação em 4 áreas e 77 perguntas",
            image_url: "/static/scales/atec.png"
        },
    });

    // 2. Criar as perguntas do relatório de crise
    const questions = [
        {
            item_order: 1, content: "Sabe próprio nome", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 2, content: "Responde ao 'Não' ou 'Pare'", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 3, content: "Pode obedecer certas ordens", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 4, content: "Consegue usar uma palavra por vez", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 5, content: "Consegue usar 2 palavras juntas", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 6, content: "Consegue usar 3 palavras juntas", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 7, content: "Sabe 10 ou mais palavras", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 8, content: "Consegue usar orações com 4 ou mais palavras", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 9, content: "Explica o que quer", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 10, content: "Faz perguntas com sentido", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 11, content: "Sua linguagem costuma ser relevante/com sentido", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 12, content: "Com frequência usa várias orações sucessivas", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 13, content: "Mantém uma conversa razoavelmente boa", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },
        {
            item_order: 14, content: "Tem capacidade normal de comunicação para a sua idade", domain: "Fala/Linguagem/Comunicação", color: "#4287f5", items: [
                { item_order: 1, content: "Não verdadeiro", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Verdade", score: 2 },
            ]
        },







        {
            item_order: 15, content: "Parece estar fechado em si mesmo - não é possível interagir com ele/ela", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 16, content: "Não presta atenção nas pessoas", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },]
        },
        {
            item_order: 17, content: "Mostra pouca ou nada de atenção quando falamos com ele", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 18, content: "Não é cooperativo e é resistente", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 19, content: "Não tem contato ocular", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 20, content: "Prefere que o deixem sozinho", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 21, content: "Não demonstra afeto", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 22, content: "Não cumprimenta os pais", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 23, content: "Evita contato com outras pessoas", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 24, content: "Não imita", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 25, content: "Não gosta que lhe abracem ou acariciem", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 26, content: "Não compartilha/mostra coisas aos outros", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 27, content: "Não se despede fazendo tchau", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 28, content: "Desagradável/desobediente", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 29, content: "Birras", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 30, content: "Não tem amigos/companheiros", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 31, content: "Sorri muito pouco", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 32, content: "Insensível aos sentimentos dos outros", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 33, content: "Não tem interesse em agradar os outros", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 34, content: "Fica indiferente quando os pais vão embora, se distanciam", domain: "Sociabilidade", color: "#37bf6e", items: [
                { item_order: 1, content: "Não descritivo", score: 0 },
                { item_order: 2, content: "Mais ou menos", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },










        {
            item_order: 35, content: "Responde ao próprio nome", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 36, content: "Reconhece quando é elogiado", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 37, content: "Olha para as pessoas e animais", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 38, content: "Assiste desenhos na TV", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 39, content: "Desenha, colore, faz objetos de arte", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 40, content: "Brinca com os brinquedos de forma correta", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 41, content: "Tem uma expressão facial apropriada", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 42, content: "Entende as histórias da TV", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 43, content: "Entende as suas explicações", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 44, content: "Está consciente do ambiente que lhe rodeia", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 45, content: "Tem consciência de perigo", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 46, content: "Mostra imaginação", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 47, content: "Inicia atividades", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 48, content: "Se veste sozinho", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 49, content: "Curioso, interessado", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 50, content: "Se aventura, explora", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 51, content: "Sintonizado, não parece estar 'nas nuvens'", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },
        {
            item_order: 52, content: "Olha para onde os outros olham", domain: "Percepção sensorial /cognitiva:", color: "#743e9e", items: [
                { item_order: 1, content: "Não descreve meu filho", score: 0 },
                { item_order: 2, content: "Descreve um pouco", score: 1 },
                { item_order: 3, content: "Descreve meu filho", score: 2 },
            ]
        },





        {
            item_order: 53, content: "Enuresis (urina na cama)", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 54, content: "Urina nas calças ou fralda", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 55, content: "Defeca nas calças ou fralda", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 56, content: "Diarreia", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 57, content: "Prisão de ventre", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 58, content: "Problemas para dormir", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 59, content: "Come muito/muito pouco", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 60, content: "Dieta extremamente limitada, não aceita qualquer comida", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 61, content: "Hiperativo", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 62, content: "Letárgico", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 63, content: "Machuca a si mesmo", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 64, content: "Machuca os outros", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 65, content: "Destrutivo", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 66, content: "Sensível a barulho", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 67, content: "Ansioso/medroso", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 68, content: "Triste/chora", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 69, content: "Convulsões", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 70, content: "Fala/linguagem obsessiva", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 71, content: "Rotinas rígidas", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 72, content: "Grita", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 73, content: "Exige que as coisas sejam sempre feitas da mesma forma", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 74, content: "Com frequência fica agitado", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 75, content: "Não é sensível a dor", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 76, content: "Obcecado com certos objetos/temas", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
        {
            item_order: 77, content: "Faz gestos, movimentos repetitivos", domain: "Saúde / Aspectos físicos / Comportamento", color: "#ffc457", items: [
                { item_order: 1, content: "Não é um problema", score: 0 },
                { item_order: 2, content: "Problema menor", score: 1 },
                { item_order: 3, content: "Problema moderado", score: 2 },
                { item_order: 4, content: "Problema sério", score: 3 },
            ]
        },
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

    console.log("ATEC inserido com sucesso");
}

insertCrisisReport()
    .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle unique constraint violation
            if (e.code === 'P2002') {
                console.error(`ERR: Test Already exist in the database - Dont worry, this error is prety normal during updates`);
            }
        } else {
            console.error(e);
        }
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
