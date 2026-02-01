const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./blog_test_helper')
const User = require('../models/user')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await api
      .post('/api/users')
      .send({ username: 'testUser', name: 'testUser', password: 'testUser'})
    
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'testUser' })

    token = loginResponse.body.token
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

// Ex 4.13.
test('delete a single blog post resource', async () => {
    // const blogAtStart = await helper.blogsInDb()
    // const blogToDelete = blogAtStart[0]
    const newBlog = {
        title: 'Blog to delete',
        author: 'User to delete',
        url: 'delete.com',
        likes: 3
    }

    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogToDelete = blogResponse.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

// Ex 4.14
test('update the number of likes for blog post', async () => {
    const newBlog = {
        title: 'Test Blog 1',
        author: 'Test Author 1',
        url: 'https://example1.com',
        likes: 33333333
    }
    
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const allBlogsAgain = await helper.blogsInDb()
    
    const likes = allBlogsAgain.map(b => b.likes)
    assert(likes.includes(newBlog.likes))
})

after(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
})