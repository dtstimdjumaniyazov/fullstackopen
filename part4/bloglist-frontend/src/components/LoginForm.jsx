import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setMessage, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

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
          navigate('/blogs')
        } catch (error) {
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          console.error('Error in handleLogin', error)
        }
    }

    return (
        <>
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
        </>
    )
}

export default LoginForm