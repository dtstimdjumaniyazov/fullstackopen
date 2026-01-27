const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: 'Test Blog 1',
        author: 'Test Author 1',
        url: 'https://example1.com',
        likes: 0
    },
    {
        title: 'Test Blog 2',
        author: 'Test Author 2',
        url: 'https://example2.com',
        likes: 1
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}