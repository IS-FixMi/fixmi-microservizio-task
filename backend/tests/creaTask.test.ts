const request = require('supertest');

describe('Testing /api/tasks/creaTask', () => {

  it('Sending request with missing fields, should return 400', async () => {
    const response = await request('10.5.0.12:3001')
        .post('/api/tasks/creaTask');
    expect(response.status).toBe(400);
  });
  
  it('Sending request with wrong token, should return 401', async () => {
    const response = await request('10.5.0.12:3001')
        .post('/api/tasks/creaTask')
        .type('form')
        .send({token: "fake"});
    expect(response.status).toBe(401);
  });

  it('Sending right token but no task tag, should return 400 missing fileds', async () => {

    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({tasktag: token});
    expect(response.status).toBe(400);
  });

  it('Sending right token but a wrong task tag, should return 400 tasktag not found', async () => {

    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({tasktag: token, taskTag: "fake"});
    expect(response.status).toBe(400);
  });

  it('Sending a good task tag but without enouth attributes, should return 400 not enough attributes', async () => {

    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;


    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({token: token, taskTag: "Magazzino", nome: "test"});
    expect(response.status).toBe(400);
  });

  it('Sending everything right, should return 200 OK', async () => {

    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;
          
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/creaTask')
           .type('form')
           .send({token: token, taskTag: "Magazzino", nome: "justatest", descrizione: "test"});
    expect(response.status).toBe(200);
  });
});
