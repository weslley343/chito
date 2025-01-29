import request from 'supertest';
import app from '../src/index';  // Importe seu app Express
import { server } from '../src/index';

afterAll(() => {
    server.close(); // Fecha o servidor após todos os testes
});

describe('Testando rotas do professional', () => {

    test('POST / criar profissional', async () => {
        const response = await request(app)
            .post('/professional')
            .send({
                identifier: 'hosh',
                full_name: 'Nome Completo',
                password: 'senhaSegura123',
                description: 'Descrição opcional do usuário, podendo ter até 100 caracteres.',
                email: 'exemplo2@email.com',
                specialty: 'Pediatra',
            });

        expect(response.status).toBe(201);

        // Verifique se a resposta contém os dados esperados e os valores corretos
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('identifier', 'hosh');
        expect(response.body).toHaveProperty('full_name', 'Nome Completo');
        expect(response.body).toHaveProperty('image_url', null);
        expect(response.body).toHaveProperty('password', 'senhaSegura123');
        expect(response.body).toHaveProperty('description', 'Descrição opcional do usuário, podendo ter até 100 caracteres.');
        expect(response.body).toHaveProperty('email', 'exemplo2@email.com');
        expect(response.body).toHaveProperty('specialty', 'Pediatra');
        expect(response.body).toHaveProperty('created_at');

        // Verifique se o campo 'id' tem o formato UUID (se aplicável)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        expect(response.body.id).toMatch(uuidRegex);

        // Verifique se o campo 'created_at' tem o formato de data ISO 8601
        const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
        expect(response.body.created_at).toMatch(dateRegex);
    });
});
