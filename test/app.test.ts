import request from 'supertest';
import app from '../src/index';  // Importe seu app Express
import { server } from '../src/index';

afterAll(() => {
    server.close(); // Fecha o servidor após todos os testes
});

describe('Testando rotas do app', () => {

    test('GET / deve retornar "hello BASE"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);  // Verifica se o status é 200
        expect(response.body.msg).toBe('hello BASE');  // Verifica a resposta
    });
});

