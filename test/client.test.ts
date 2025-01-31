import request from 'supertest';
import app from '../src/index';
// não sei exatamente o motivo, mas se eu repetir o username ou email na suíte de testes,
// o banco de dados ás vezes diz que o usuário já foi criado mesmo após o fluxo de deleção.
// Por hora, por favor, criar fluxos de teste com nomes diferentes para cada arquivo.
//todo: investigar o motivo
describe('Testando Rotas de client', () => {
    let token1, clientId;

    test('CRIANDO RESPONSIBLE', async () => {
        const response = await request(app)
            .post('/responsible')
            .send({
                identifier: 'nilce2',
                full_name: 'Nilcelaine Moretto Martins',
                password: 'senhaSegura123',
                description: 'Hello, im using acompanhar(chito version)',
                email: 'nilce2@email.com'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');

        // Login do responsável
        const loginResponse = await request(app)
            .post('/responsible/signin')
            .send({
                email: 'nilce2@email.com',
                password: 'senhaSegura123',
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('acetoken');

        token1 = loginResponse.body.acetoken;

        // Criar client
        const clientResponse = await request(app)
            .post('/client/')
            .set('Authorization', `Bearer ${token1}`)
            .send({
                identifier: 'wess1',
                full_name: 'Weslley David Pereira Marques',
                birthdate: '2002-11-25T00:00:00Z',
                gender: 'male',
                description: 'Problemas de comunicação.'
            });

        expect(clientResponse.status).toBe(201);
        expect(clientResponse.body).toMatchObject({
            identifier: 'wess1',
            full_name: 'Weslley David Pereira Marques',
            birthdate: '2002-11-25T00:00:00.000Z',
            gender: 'male',
            description: 'Problemas de comunicação.'
        });

        const clientId = clientResponse.body.id; // Pegando o ID correto

        //detalhar cliente
        const clientDetailResponse = await request(app)
            .get(`/client/${clientId}`) // ID passado corretamente na URL
            .set('Authorization', `Bearer ${token1}`)
            .send();

        expect(clientDetailResponse.status).toBe(200);
        expect(clientDetailResponse.body).toHaveProperty('id', `${clientId}`);

        // Deletar client
        const clientDeleteResponse = await request(app)
            .delete(`/client/${clientId}`) // ID passado corretamente na URL
            .set('Authorization', `Bearer ${token1}`)
            .send();

        expect(clientDeleteResponse.status).toBe(200);

        expect(clientDeleteResponse.body).toHaveProperty('count');



        // Deletar o responsible
        const deleteResponse = await request(app)
            .delete('/responsible/')
            .set('Authorization', `Bearer ${token1}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('id');
        expect(deleteResponse.body).toHaveProperty('identifier', 'nilce2');
        expect(deleteResponse.body).toHaveProperty('full_name');
        expect(deleteResponse.body).toHaveProperty('email', 'nilce2@email.com');

        // Verificar se o responsible realmente foi deletado
        const getResponsibleResponse = await request(app)
            .get('/responsible/')
            .set('Authorization', `Bearer ${token1}`);

        expect(getResponsibleResponse.status).toBe(404);
    });
});
