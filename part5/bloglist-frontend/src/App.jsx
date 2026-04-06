import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('I was clicked')
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      navigate('/')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('Error logout', error)
    }
  }

  const handleCreate = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({ ...createdBlog, user: { name: user.name, id: createdBlog.user } }))
      setMessage(`a new blog ${newBlog.title} by ${JSON.parse(localStorage.getItem('loggedBlogappUser')).username} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      navigate('/')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('Error in handleCreate', error)
    }

  }

  const handleLike = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      })
      setBlogs(blogs.map(blog => {
        return blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog
      }))
    } catch (error) {
      console.error('Error update likes', error)
    }
  }

  const handleRemove = async (id) => {
    try {
      if (window.confirm('Are you sure you want to remove this blog?')) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('Error removing blog', error)
    }
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar position="static">
          <Button color='inherit'><Link style={{ margin: '5px' }} to="/">Blogs</Link></Button>
          <Button color='inherit'><Link style={{ margin: '5px' }} to='/create-blog'>new blog</Link></Button>
          {
            user
              ? <Button color='inherit' onClick={handleLogout}>Logout</Button>
              : <Button color='inherit'><Link style={{ margin: '5px' }} to="/login">Login</Link></Button>
          }
        </Toolbar>
      </AppBar>

      <div>
        <Notification message={message} severity="success"/>
      </div>

      <div>
        <Notification message={errorMessage} severity="error"/>
      </div>

      <Routes>
        <Route style={{ margin: '5px' }} path='/' element={<BlogList blogs={blogs} user={user} addLike={handleLike} remove={handleRemove} />} />
        <Route path='/blogs/:id' element={<BlogDetails blogs={blogs} addLike={handleLike} remove={handleRemove} user={user} />}/>
        <Route path='/create-blog' element={<NewBlogForm createBlog={handleCreate} />} />
        <Route style={{ margin: '5px' }} path='/login' element={<LoginForm message={setErrorMessage} setUser={setUser} />} />
      </Routes>
    </Container>
  )
}

export default App