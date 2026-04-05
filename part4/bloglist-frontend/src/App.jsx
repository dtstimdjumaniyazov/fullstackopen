import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //login-logout
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notification
  const [message, setMessage] = useState(null)

  //useRef hook
  const blogFormRef = useRef()

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error('Error in handleLogin', error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('I was clicked')
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error('Error logout', error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const login = () =>
  {if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div>{loginForm()}</div>
      </div>
    )
  } else if (user) {
    return (
      <div>
        <p><strong>{user.username}</strong> logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }}

  const handleCreate = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({...createdBlog, user: { name: user.name, id: createdBlog.user }}))
      setMessage(`a new blog ${newBlog.title} by ${JSON.parse(localStorage.getItem('loggedBlogappUser')).username} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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


  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <NewBlogForm createBlog={handleCreate} />
    </Togglable>
  )

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  // console.log('sortedBlogs', sortedBlogs)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      {login()}
      {user && blogForm()}
      {user && sortedBlogs.map(sortedBlog =>
        <Blog
          key={sortedBlog.id}
          blog={sortedBlog}
          addLike={() => handleLike(sortedBlog.id, sortedBlog)}
          remove={() => handleRemove(sortedBlog.id)}
          user={user}
        />
      )}
    </div>
  )
}

export default App