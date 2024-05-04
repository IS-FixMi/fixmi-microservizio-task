const request = require('supertest');

describe('Testing /api/tasks/creaTask', () => {

  it('Sending request with missing fields, should return 400', async () => {
    const response = await request('10.5.0.12:3001')
        .post('/api/tasks/creaTask');
    expect(response.status).toBe(400);
  });

  it('Sending a wrong task tag, should return 400 tasktag not found', async () => {
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({tasktag: "fake"});
    expect(response.status).toBe(400);
  });

  it('Sending a good task tag but without enouth attributes, should return 400 not enough attributes', async () => {
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({taskTag: "Magazzino", nome: "test"});
    expect(response.status).toBe(400);
  });

  it('Sending everything right, should return 200 OK', async () => {
          
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({taskTag: "Magazzino", nome: "justatest", descrizione: "test"});
    expect(response.status).toBe(200);
  });
});
