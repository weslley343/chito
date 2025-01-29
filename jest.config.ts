import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  rootDir: './',  // Define o diretório raiz
  testMatch: ['**/test/**/*.test.ts'],  // Atualiza para procurar na pasta 'test'
  collectCoverage: true,
};

export default config;
