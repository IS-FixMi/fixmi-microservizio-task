const request = require('supertest');

describe('Testing /api/tasks/getListaTaskInLavorazione', () => {

  it('Sending request with missing fields, should return 400', async () => {
    const response = await request('10.5.0.12:3001')
        .post('/api/tasks/getListaTaskInLavorazione');
    expect(response.status).toBe(400);
  });

  it('Sending a wring token, should return 401 user not found with given token', async () => {
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/getListaTaskInLavorazione')
           .type('form')
           .send({token: "fake"});
    expect(response.status).toBe(401);
  });

  it('Sending a token from a Cliente, should return 403 not allowed', async () => {
  
    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"cliente@hotmail.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    // sending the request
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/getListaTaskInLavorazione')
           .type('form')
           .send({token: token});
    expect(response.status).toBe(403);
  });

  it('Sending the right token, should return 200 OK', async () => {
  
    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"test@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    // sending the request
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/getListaTaskInLavorazione')
           .type('form')
           .send({token: token});
    expect(response.status).toBe(200);
  });
});
