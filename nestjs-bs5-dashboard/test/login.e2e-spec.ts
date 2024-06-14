import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { getAppInstance } from '../src/app.module';
import { DatabaseService } from '../src/common/modules/database/database.service';

describe('Login2  2(e2e)', () => {
  let server: supertest.SuperTest<supertest.Test>;
  let app: INestApplication;
  let database: DatabaseService;
  let token;

  beforeAll(async () => {
    app = await getAppInstance();

    database = app.get(DatabaseService);

    /**
     * Reset Database
     */
    await database.resetDatabase();

    /**
     * Start Seeding
     */
    await database.startSeeding();

    /**
     * Start Migrations
     */
    await database.startMigrations();

    server = await request(await app.listen(3000));
  });

  it('Login User without parameters', async () => {
    const response = await server.post('/v1/user/login');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(false);
  });

  it('Login User with incorrect parameters', async () => {
    const params = {
      email: 'wrongemail@gmail.com',
      password: '12345678',
    };
    const response = await server.post('/v1/user/login').send(params);
    expect(response.statusCode).toBe(401);
  });

  it('Login User with correct parameters', async () => {
    const params = {
      email: 'markernest.matute@gmail.com',
      password: '12345678',
    };
    const response = await server.post('/v1/user/login').send(params);
    expect(response.body.data.token).toBeDefined();
    expect(response.statusCode).toBe(200);

    // set token
    token = response.body.data.token;
  });

  it('Get User session using valid token', async () => {
    const response = await server.get('/v1/user/session').set({
      Authorization: `Bearer ${token}`,
    });
    expect(response.body.data.id).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('Get User session using invalid token', async () => {
    const response = await server.get('/v1/user/session').set({
      Authorization: `Bearer invalidtokensample`,
    });
    expect(response.statusCode).toBe(403);
  });

  afterAll(async () => {
    await database.stop();
    await app.close();
    server = null;
  });
});
