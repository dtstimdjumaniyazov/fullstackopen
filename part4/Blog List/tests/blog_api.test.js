const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./blog_test_helper')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

// Ex 4.8
test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})


// Ex 4.9
test('all blogs posts in named ID as String', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
        assert.strictEqual(typeof blog.id, 'string')
    })
})

// test('all blogs are returned', async () => {
//     const response = await api.get('/api/blogs')

//     assert.strictEqual(response.body.length, helper.initialBlogs.length)
// })

// Ex 4.10
test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test Blog 3',
        author: 'Test Author 3',
        url: 'https://example3.com',
        likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

// Ex 4.11** 
test('a blog without likes defaults to 0', async () => {
    const newBlog = {
        title: 'Test Blog 4',
        author: 'Test Author 4',
        url: 'https://example4.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

// Ex 4.12*
test('a blog without title or url is not added', async () => {
    const newBlog = {
        author: 'Test Author 5',
        url: 'https://example5.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})