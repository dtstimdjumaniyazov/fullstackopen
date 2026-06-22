const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')


const api = supertest(app)

test('username validation', async () => {
    const newUser = {
        username: '11',
        name: 'Ivan',
        password: 'validation'
    }

    expectedError = {
        "error": "To create username, it should contain at least 3 characters long"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      assert.deepStrictEqual(response.body, expectedError)
})

test('password validation', async () => {
    const newUser = {
        username: '111',
        name: 'Ivan',
        password: '11'
    }

    expectedError = {
        "error": "Password should have at least 3 characters long"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      assert.deepStrictEqual(response.body, expectedError)
})

after(async () => {
    await mongoose.connection.close()
})