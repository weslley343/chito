import request from 'supertest';
import app from '../src/index';  // Agora o servidor não inicia automaticamente

describe('Testando Login de Profissional', () => {
    test('POST / criar profissional', async () => {
        const response = await request(app)
            .post('/professional')
            .send({
                identifier: 'leon1',
                full_name: 'Leon Oliveira Martinso',
                password: 'senhaSegura123',
                email: 'leon1@email.com',
                specialty: 'Pediatra',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('POST /professional/signin - Login do profissional', async () => {
        const response = await request(app)
            .post('/professional/signin')
            .send({
                email: 'leon1@email.com',
                password: 'senhaSegura123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('signin', true);
        expect(response.body).toHaveProperty('reftoken');
        expect(response.body).toHaveProperty('acetoken');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('type', 'professional');
        expect(response.body).toHaveProperty('identifier', 'leon1');
    });

    test('DELETE /professional/delete - Deletar profissional', async () => {
    // Primeiro, fazer login para obter o token
    const loginResponse = await request(app)
        .post('/professional/signin')
        .send({
            email: 'leon1@email.com',
            password: 'senhaSegura123',
        });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('acetoken');

    const token = loginResponse.body.acetoken;

    // Fazer a requisição para deletar o profissional
    const deleteResponse = await request(app)
        .delete('/professional/')
        .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('id');
    expect(deleteResponse.body).toHaveProperty('identifier', 'leon1');
    expect(deleteResponse.body).toHaveProperty('full_name');
    expect(deleteResponse.body).toHaveProperty('email', 'leon1@email.com');
});

});
