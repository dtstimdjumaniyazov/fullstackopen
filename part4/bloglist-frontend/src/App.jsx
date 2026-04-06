import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
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
      navigate('/blogs')
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error('Error logout', error)
    }
  }

  const handleCreate = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({...createdBlog, user: { name: user.name, id: createdBlog.user }}))
      setMessage(`a new blog ${newBlog.title} by ${JSON.parse(localStorage.getItem('loggedBlogappUser')).username} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      navigate('/blogs')
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
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
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error('Error removing blog', error)
    }
  }

  return (
    <>
      <div>
        <Notification message={message}/>
      </div>
      <div>
        <Link style={{margin: '5px'}} to="/blogs">Blogs</Link>
        <Link style={{margin: '5px'}} to='/create-blog'>new blog</Link>
        {
          user 
            ? <button onClick={handleLogout}>Logout</button>
            : <Link style={{margin: '5px'}} to="/login">Login</Link>
        }
      </div>

      <Routes>
        <Route style={{margin: '5px'}} path='/blogs' element={<BlogList blogs={blogs} user={user}/>} />
        <Route path='/blogs/:id' element={<BlogDetails blogs={blogs} addLike={handleLike} remove={handleRemove} user={user} />}/>
        <Route path='/create-blog' element={<NewBlogForm createBlog={handleCreate} />} />
        <Route style={{margin: '5px'}} path='/login' element={<LoginForm setMessage={setMessage} setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App