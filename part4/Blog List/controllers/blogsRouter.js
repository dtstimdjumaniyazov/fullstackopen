const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const { useExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1})

    response.json(blogs)
})

blogsRouter.post('/', useExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    
    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', useExtractor, async (request, response) => {
    const user = request.user
    
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({error: 'blog not found'})
    }
    
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } 
    
    if (blog.user.toString() !== user.id.toString()){
        return response.status(403).json({error: 'a blog can be deleted only by the user who added it'})
    }
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