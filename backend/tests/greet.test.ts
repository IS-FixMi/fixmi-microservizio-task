const request = require('supertest');

describe('Testing /api/tasks/greet', () => {

  it('Sending request', async () => {
    const response = await request('10.5.0.12:3001')
        .get('/api/tasks/greet');
    expect(response.status).toBe(200);
  });

});
