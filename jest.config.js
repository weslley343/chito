"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    rootDir: './', // Define o diretório raiz
    testMatch: ['**/test/**/*.test.ts'], // Atualiza para procurar na pasta 'test'
    collectCoverage: true,
};
exports.default = config;
