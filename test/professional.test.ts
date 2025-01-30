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
                identifier: 'leon1',
                full_name: 'Leon Oliveira Martinso',
                password: 'senhaSegura123',
                description: 'Descrição opcional do usuário, podendo ter até 100 caracteres.',
                email: 'leon1@email.com',
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

    test('POST /login - autenticar profissional', async () => {
        const response = await request(app)
            .post('/login') // Assuming the login endpoint is `/login`
            .send({
                email: 'leon1@email.com',
                password: 'senhaSegura123',
            });
    
        // Check if the response status is 200 (OK)
        expect(response.status).toBe(200);
    
        // Validate the response body structure
        expect(response.body).toHaveProperty('signin', true);
        expect(response.body).toHaveProperty('reftoken');
        expect(response.body).toHaveProperty('acetoken');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('type', 'professional');
        expect(response.body).toHaveProperty('identifier', 'leon1');
    
        // Validate the token formats (basic regex for JWT tokens)
        const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
        expect(response.body.reftoken).toMatch(jwtRegex);
        expect(response.body.acetoken).toMatch(jwtRegex);
    
        // Validate the ID format (UUID)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        expect(response.body.id).toMatch(uuidRegex);
    });

    test('DELETE /professional/{id} - deletar profissional', async () => {
        // Step 1: Log in to get the authentication token
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: 'leon1@email.com',
                password: 'senhaSegura123',
            });
    
        // Ensure login was successful
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('acetoken');
    
        // Extract the access token
        const accessToken = loginResponse.body.acetoken;
    
        // Step 2: Use the token to delete the professional
        const professionalId = 'd53db996-de6d-11ef-97df-0242ac190002'; // ID of the professional to delete
        const deleteResponse = await request(app)
            .delete(`/professional/${professionalId}`)
            .set('Authorization', `Bearer ${accessToken}`); // Attach the token to the request
    
        // Step 3: Validate the response
        expect(deleteResponse.status).toBe(200); // Assuming 200 is returned for successful deletion
    
        // Validate the response body
        expect(deleteResponse.body).toEqual({
            id: professionalId,
            identifier: 'leon1',
            full_name: 'Leon Oliveira Martins',
            description: 'Hello, im using acompanhar(chito version)',
            email: 'leon1@email.com',
            specialty: 'Pediatra',
            created_at: '2025-01-29T18:21:18.214Z',
        });
    });


});
