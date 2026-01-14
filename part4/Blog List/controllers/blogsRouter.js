const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
      .then((blogs) => {
        response.json(blogs)
      })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((results) => {
        response.status(201).json(results)
    })
})

module.exports = blogsRouter