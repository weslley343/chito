import request from 'supertest';
import app from '../src/index';

// Tipagem das respostas esperadas
interface AuthResponse {
    acetoken: string;
}

interface CreateUserResponse {
    id: string;
}

interface CreateClientResponse {
    id: string;
    code: string;
}

interface DeleteResponse {
    count: number;
}

// Função auxiliar para criar um responsável
const createResponsible = async (identifier: string, email: string): Promise<string> => {
    const response = await request(app).post('/responsible').send({
        identifier,
        full_name: 'Nilcelaine Moretto Martins',
        password: 'senhaSegura123',
        description: 'Hello, im using acompanhar(chito version)',
        email
    });

    expect(response.status).toBe(201);
    return (response.body as CreateUserResponse).id;
};

// Função auxiliar para fazer login de um responsável
const loginResponsible = async (email: string): Promise<string> => {
    const response = await request(app).post('/responsible/signin').send({
        email,
        password: 'senhaSegura123'
    });

    expect(response.status).toBe(200);
    return (response.body as AuthResponse).acetoken;
};

// Função auxiliar para criar um profissional
const createProfessional = async (identifier: string, email: string): Promise<string> => {
    const response = await request(app).post('/professional').send({
        identifier,
        full_name: 'Leon Oliveira Martinso',
        password: 'senhaSegura123',
        email,
        specialty: 'Pediatra'
    });

    expect(response.status).toBe(201);
    return (response.body as CreateUserResponse).id;
};

// Função auxiliar para fazer login de um profissional
const loginProfessional = async (email: string): Promise<string> => {
    const response = await request(app).post('/professional/signin').send({
        email,
        password: 'senhaSegura123'
    });

    expect(response.status).toBe(200);
    return (response.body as AuthResponse).acetoken;
};

// Função auxiliar para criar um cliente
const createClient = async (token: string): Promise<CreateClientResponse> => {
    const response = await request(app)
        .post('/client/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            identifier: 'wess1',
            full_name: 'Weslley David Pereira Marques',
            birthdate: '2002-11-25T00:00:00Z',
            gender: 'male',
            description: 'Problemas de comunicação.'
        });

    expect(response.status).toBe(201);
    return response.body as CreateClientResponse;
};

// Função auxiliar para criar uma relação
const createRelation = async (route: string, token: string, identifier: string, code: string): Promise<void> => {
    const response = await request(app)
        .post(route)
        .set('Authorization', `Bearer ${token}`)
        .send({ identifier, code });

    expect(response.status).toBe(201);
};

// Função auxiliar para deletar uma relação
const deleteRelation = async (route: string, token: string, identifier: string): Promise<void> => {
    const response = await request(app)
        .delete(route)
        .set('Authorization', `Bearer ${token}`)
        .send({ identifier });

    expect(response.status).toBe(200);
};

// Função auxiliar para deletar um profissional
const deleteProfessional = async (token: string): Promise<void> => {
    const response = await request(app)
        .delete('/professional/')
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
};

// Função auxiliar para deletar um responsável
const deleteResponsible = async (token: string): Promise<void> => {
    const response = await request(app)
        .delete('/responsible/')
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
};

// Função auxiliar para deletar um cliente
const deleteClient = async (token: string, clientId: string): Promise<void> => {
    const response = await request(app)
        .delete(`/client/${clientId}`)
        .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
};

// Teste principal
describe('Testando Relations', () => {
    let token1: string;
    let token2: string;
    let token3: string;
    let clientId: string;
    let code: string;

    test('Testando relations', async () => {
        // Criando e logando responsáveis
        await createResponsible('nilce3', 'nilce3@email.com');
        token1 = await loginResponsible('nilce3@email.com');

        await createResponsible('nilce4', 'nilce4@email.com');
        token2 = await loginResponsible('nilce4@email.com');

        // Criando e logando profissional
        await createProfessional('leon4', 'leon4@email.com');
        token3 = await loginProfessional('leon4@email.com');

        // Criando cliente
        const client = await createClient(token1);
        clientId = client.id;
        code = client.code;

        // Criando e deletando relação responsável-cliente
        await createRelation('/relation/responsible', token2, 'wess1', code);
        await deleteRelation('/relation/responsible', token2, 'wess1');

        // Criando e deletando relação profissional-cliente
        await createRelation('/relation/professional', token3, 'wess1', code);
        await deleteRelation('/relation/professional', token3, 'wess1');

        // Detalhar cliente
        const clientDetailResponse = await request(app)
            .get(`/client/${clientId}`)
            .set('Authorization', `Bearer ${token1}`)
            .send();

        expect(clientDetailResponse.status).toBe(200);
        expect(clientDetailResponse.body).toHaveProperty('id', clientId);

        // Deletar cliente
        await deleteClient(token1, clientId);

        // Deletar responsável nilce3
        await deleteResponsible(token1);

        // Verificar se o responsável nilce3 realmente foi deletado
        const getResponsibleResponse = await request(app)
            .get('/responsible/')
            .set('Authorization', `Bearer ${token1}`);

        expect(getResponsibleResponse.status).toBe(404);

        // Deletar profissional leon4
        await deleteProfessional(token3);

        // Deletar responsável nilce4
        await deleteResponsible(token2);


    });
});
