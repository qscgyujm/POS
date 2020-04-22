import request from 'supertest';
import app from '../server/app';

test('should login', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@gmail.com',
      password: '123456',
    });

  expect(response.header).toHaveProperty('token');
  expect(response.status).toBe(200);
});


test('should Admin login', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'froggy@gmail.com',
      password: '123456',
    });

  expect(response.header).toHaveProperty('token');
  expect(response.status).toBe(200);
  expect(response.body).toBeTruthy();
});
