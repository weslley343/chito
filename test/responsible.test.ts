import request from 'supertest';
import app from '../src/index';  // Agora o servidor não inicia automaticamente

describe('Testando Login de responsible', () => {
    test('POST / criar responsible', async () => {
        const response = await request(app)
            .post('/responsible')
            .send({
                "identifier": "nilce1",
                "full_name": "Nilcelaine Moretto Martins",
                "password": "senhaSegura123",
                "description": "Hello, im using acompanhar(chito version)",
                "email": "nilce1@email.com"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('POST /responsible/signin - Login do responsible', async () => {
        const response = await request(app)
            .post('/responsible/signin')
            .send({
                email: 'nilce1@email.com',
                password: 'senhaSegura123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('signin', true);
        expect(response.body).toHaveProperty('reftoken');
        expect(response.body).toHaveProperty('acetoken');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('type', 'responsible');
        expect(response.body).toHaveProperty('identifier', 'nilce1');
    });

    test('DELETE /responsible/delete - Deletar responsible', async () => {
        // Primeiro, fazer login para obter o token
        const loginResponse = await request(app)
            .post('/responsible/signin')
            .send({
                email: 'nilce1@email.com',
                password: 'senhaSegura123',
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('acetoken');

        const token = loginResponse.body.acetoken;

        // Fazer a requisição para deletar o profissional
        const deleteResponse = await request(app)
            .delete('/responsible/')
            .set('Authorization', `Bearer ${token}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('id');
        expect(deleteResponse.body).toHaveProperty('identifier', 'nilce1');
        expect(deleteResponse.body).toHaveProperty('full_name');
        expect(deleteResponse.body).toHaveProperty('email', 'nilce1@email.com');
    });

});
