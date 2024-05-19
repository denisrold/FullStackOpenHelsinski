const {
  test, after, beforeEach, describe,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);
describe('when there is initially users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'roote',
      passwordHash,
      name: 'usu ario2',
    });
    await user.save();
  });
  describe('User Creation', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'usuario1',
        name: 'usu ario2',
        password: 'Aasdfg123*',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'roote',
        name: 'usuario2',
        password: 'Aasdfg123*',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const userAtEnd = await helper.usersInDb();
      assert(result.body.error.includes('expected `username` to be unique'));
      assert.strictEqual(usersAtStart.length, userAtEnd.length);
    });

    test('creation fails with low secure password', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'rooter',
        name: 'usuario2',
        password: '123456*',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const userAtEnd = await helper.usersInDb();
      assert(
        result.body.error.includes(
          'Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
        ),
      );
      assert.strictEqual(usersAtStart.length, userAtEnd.length);
    });
  });

  describe('Login User', () => {
    test('Loggin user succeds', async () => {
      const newUser = {
        username: 'usuario1',
        name: 'usu ario2',
        password: 'Aasdfg123*',
      };
      await api.post('/api/users').send(newUser).expect(201);
      const logginUser = await api
        .post('/api/login')
        .send({
          username: 'usuario1',
          name: 'usuario2',
          password: 'Aasdfg123*',
        })
        .expect(200);
      assert(
        'token' in logginUser._body
          && 'username' in logginUser._body
          && 'name' in logginUser._body,
      );
      assert.deepStrictEqual(newUser.username, logginUser._body.username);
    });
    test('login fail with invalid username', async () => {
      const newUser = {
        username: 'usuario1',
        name: 'usu ario2',
        password: 'Aasdfg123*',
      };
      await api.post('/api/users').send(newUser).expect(201);
      await api
        .post('/api/login')
        .send({
          username: 'usuariosaurio',
          password: 'Aasdfg123*',
        })
        .expect(401);
    });
    test('login fail with invalid password', async () => {
      const newUser = {
        username: 'usuario1',
        name: 'usu ario2',
        password: 'Aasdfg123*',
      };
      await api.post('/api/users').send(newUser).expect(201);
      await api
        .post('/api/login')
        .send({
          username: 'usuariosaurio',
          password: 'Aas123123',
        })
        .expect(401);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
