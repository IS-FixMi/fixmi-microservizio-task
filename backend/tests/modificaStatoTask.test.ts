const request = require('supertest');

describe('Testing /api/tasks/modificaStatoTask', () => {

  it('Sending request with missing fields, should return 400', async () => {
    const response = await request('10.5.0.12:3001')
        .post('/api/tasks/modificaStatoTask');
    expect(response.status).toBe(400);
  });


  it('Sending a wrong token, should return 401 user not found with given token', async () => {
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/modificaStatoTask')
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
           .post('/api/tasks/modificaStatoTask')
           .type('form')
           .send({token: token});
    expect(response.status).toBe(403);
  });

  it('Sending the right token with no taskid, should return 400 not enough arguments', async () => {
  
    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    // sending the request
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/modificaStatoTask')
           .type('form')
           .send({token: token, taskid: "fake"});
    expect(response.status).toBe(400);
  });

  it('Sending the right token with the right taskid but with a wrong status, should return 400 wrong status', async () => {
  
    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    // sending the request
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/modificaStatoTask')
           .type('form')
           .send({token: token, taskid: "test", taskStatus: "fake"}); // This is hardcoded, won't affect any real data
    expect(response.status).toBe(400);
  });

  it('Sending the right token with the right taskid with right status, should return 200 OK', async () => {
  
    // getting the token
    const resLogin = await request('10.5.0.11:3001')
            .post('/api/auth/login')
            .type('form')
            .send({email:"manager@test.com",password:"test",twofa:"12345"});
    let token = resLogin.body.token;

    // sending the request
    const response = await request('10.5.0.12:3001')
           .post('/api/tasks/modificaStatoTask')
           .type('form')
           .send({token: token, taskid: "test", taskStatus: "Completata"}); // This is hardcoded, won't affect any real data
    expect(response.status).toBe(200);
  });
});
