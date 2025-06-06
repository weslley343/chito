import request from 'supertest';
import app from '../src/index';

// Interfaces das respostas esperadas
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

// Funções auxiliares com nomes e identifiers atualizados

const createResponsible = async (identifier: string, email: string): Promise<string> => {
  const response = await request(app).post('/responsible').send({
    identifier,
    full_name: 'Mariana Silva',
    password: 'senhaSegura123',
    description: 'Utilizando nosso sistema de acompanhamento',
    email,
  });
  expect(response.status).toBe(201);
  return (response.body as CreateUserResponse).id;
};

const loginResponsible = async (email: string): Promise<string> => {
  const response = await request(app).post('/responsible/signin').send({
    email,
    password: 'senhaSegura123',
  });
  expect(response.status).toBe(200);
  return (response.body as AuthResponse).acetoken;
};

const createProfessional = async (identifier: string, email: string): Promise<string> => {
  const response = await request(app).post('/professional').send({
    identifier,
    full_name: 'Carlos Souza',
    password: 'senhaSegura123',
    email,
    specialty: 'Cardiologia',
  });
  expect(response.status).toBe(201);
  return (response.body as CreateUserResponse).id;
};

const loginProfessional = async (email: string): Promise<string> => {
  const response = await request(app).post('/professional/signin').send({
    email,
    password: 'senhaSegura123',
  });
  expect(response.status).toBe(200);
  return (response.body as AuthResponse).acetoken;
};

const createClient = async (token: string): Promise<CreateClientResponse> => {
  const response = await request(app)
    .post('/client/')
    .set('Authorization', `Bearer ${token}`)
    .send({
      identifier: 'clientIdentifier01',
      full_name: 'Ana Paula Costa',
      birthdate: '1990-05-15T00:00:00Z',
      gender: 'female',
      description: 'Cliente com necessidade de acompanhamento especializado.',
    });
  expect(response.status).toBe(201);
  return response.body as CreateClientResponse;
};

const createRelation = async (route: string, token: string, identifier: string, code: string): Promise<void> => {
  const response = await request(app)
    .post(route)
    .set('Authorization', `Bearer ${token}`)
    .send({ identifier, code });
  expect(response.status).toBe(201);
};

const deleteRelation = async (route: string, token: string, identifier: string): Promise<void> => {
  const response = await request(app)
    .delete(route)
    .set('Authorization', `Bearer ${token}`)
    .send({ identifier });
  expect(response.status).toBe(200);
};

const deleteProfessional = async (token: string): Promise<void> => {
  const response = await request(app)
    .delete('/professional/')
    .set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
};

const deleteResponsible = async (token: string): Promise<void> => {
  const response = await request(app)
    .delete('/responsible/')
    .set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
};

const deleteClient = async (token: string, clientId: string): Promise<void> => {
  const response = await request(app)
    .delete(`/client/${clientId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
};

/////////////////////////////////////////////////////////////////////////
// Bloco de testes para as novas rotas de consulta de relações
/////////////////////////////////////////////////////////////////////////

describe('Testando Rotas de Consulta de Relações', () => {
  // Tokens e dados que serão usados nos testes
  let tokenResponsibleA: string;
  let tokenResponsibleB: string;
  let tokenProfessional: string;
  // Supondo que o cliente utilize o token de um responsável para autenticação
  let tokenClient: string;

  let clientData: CreateClientResponse;
  let clientId: string;
  let code: string;

  // Antes de todos os testes, cria os usuários e o cliente
  beforeAll(async () => {
    // Criando responsáveis
    await createResponsible('responsibleA', 'responsibleA@test.com');
    tokenResponsibleA = await loginResponsible('responsibleA@test.com');

    await createResponsible('responsibleB', 'responsibleB@test.com');
    tokenResponsibleB = await loginResponsible('responsibleB@test.com');

    // Criando profissional
    await createProfessional('professionalA', 'professionalA@test.com');
    tokenProfessional = await loginProfessional('professionalA@test.com');

    // Criando cliente (utilizando o token de um responsável)
    clientData = await createClient(tokenResponsibleA);
    clientId = clientData.id;
    code = clientData.code;

    // Se houver rota de login para cliente, faça o login; caso contrário, utiliza o tokenResponsibleA
    tokenClient = tokenResponsibleA;
  });

  // Após os testes, realiza a limpeza dos dados criados
  afterAll(async () => {
    await deleteClient(tokenResponsibleA, clientId);
    await deleteProfessional(tokenProfessional);
    await deleteResponsible(tokenResponsibleA);
    await deleteResponsible(tokenResponsibleB);
  });

  test('GET /client/byprofessional - deve retornar o(s) cliente(s) relacionado(s) ao profissional', async () => {
    // Cria a relação profissional -> cliente (utilizando o identifier do cliente atualizado)
    await createRelation('/relation/professional', tokenProfessional, 'clientIdentifier01', code);

    // Consulta a rota de listagem de clientes para um profissional
    const response = await request(app)
      .get('/client/byprofessional')
      .query({ skip: 0, take: 10 })
      .set('Authorization', `Bearer ${tokenProfessional}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Verifica se o array retornado contém o cliente criado (pelo id)
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: clientId })])
    );

    // Remove a relação criada
    await deleteRelation('/relation/professional', tokenProfessional, 'clientIdentifier01');
  });

  test('GET /client/byresponsible - deve retornar o(s) cliente(s) relacionado(s) ao responsável', async () => {
    // Cria a relação responsável -> cliente
    await createRelation('/relation/responsible', tokenResponsibleB, 'clientIdentifier01', code);

    // Consulta a rota de listagem de clientes para um responsável
    const response = await request(app)
      .get('/client/byresponsible')
      .query({ skip: 0, take: 10 })
      .set('Authorization', `Bearer ${tokenResponsibleB}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: clientId })])
    );

    // Remove a relação criada
    await deleteRelation('/relation/responsible', tokenResponsibleB, 'clientIdentifier01');
  });

  test('GET /professional/byclient - deve retornar o(s) profissional(is) relacionado(s) ao cliente', async () => {
    // Cria a relação profissional -> cliente
    await createRelation('/relation/professional', tokenProfessional, 'clientIdentifier01', code);

    // Consulta a rota de listagem de profissionais para um cliente
    const response = await request(app)
      .get('/professional/byclient')
      .query({ skip: 0, take: 10 });

    expect(response.status).toBe(200);
    console.log("-----------------------------------------------------------------------------------")
    console.log(response.body)
    console.log("-----------------------------------------------------------------------------------")
    expect(Array.isArray(response.body)).toBe(true);
    //--------------------a parte acima da erro
    //console.log(response.body)
    // Verifica se o profissional criado está presente na resposta (por exemplo, via email)
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ email: 'professionalA@test.com' })])
    );

    // Remove a relação criada
    await deleteRelation('/relation/professional', tokenProfessional, 'clientIdentifier01');
  });

  test('GET /responsible/byclient - deve retornar o(s) responsável(is) relacionado(s) ao cliente', async () => {
    // Cria a relação responsável -> cliente
    await createRelation('/relation/responsible', tokenResponsibleB, 'clientIdentifier01', code);

    // Consulta a rota de listagem de responsáveis para um cliente
    const response = await request(app)
      .get('/responsible/byclient')
      .query({ skip: 0, take: 10 })
      .set('Authorization', `Bearer ${tokenClient}`);
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ email: 'responsibleB@test.com' })])
    );

    // Remove a relação criada
    await deleteRelation('/relation/responsible', tokenResponsibleB, 'clientIdentifier01');
  });
});
