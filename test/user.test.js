import request from 'supertest';
import uniqueString from 'unique-string';
import app from '../server/app';

test('should get user profile', async () => {
  const response = await request(app)
    .get('/api/user')
    .set('Authorization', process.env.TEST_POS_TOKEN);

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      profile: expect.objectContaining({
        email: expect.any(String),
        name: expect.any(String),
        location: expect.any(String),
        updatedAt: expect.any(String),
      }),
    }),
  );
});


test('should update user location', async () => {
  const randomLocation = uniqueString().slice(0, 6);

  const response = await request(app)
    .put('/api/user/profile')
    .set('Authorization', process.env.TEST_POS_TOKEN)
    .send({
      location: randomLocation,
    });

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      profile: expect.objectContaining({
        email: expect.any(String),
        name: expect.any(String),
        location: expect.any(String),
        updatedAt: expect.any(String),
      }),
    }),
  );
  expect(response.body.profile.location).toBe(randomLocation);
});
