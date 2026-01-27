const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true})

    if (!updatedBlog) {
        return response.status(404).end()
    }

    response.json(updatedBlog)
})

module.exports = blogsRouter