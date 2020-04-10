import request from 'supertest';
import app from '../server/app';

test('should get user product', async () => {
  const response = await request(app)
    .get('/api/user/product')
    .set('Authorization', process.env.TEST_POS_TOKEN);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('productList');
  expect(response.body).toHaveProperty('deletedProducts');
});
