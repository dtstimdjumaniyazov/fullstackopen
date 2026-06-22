import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ message, setUser }) => {
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
          navigate('/')
        } catch (error) {
          message(error.response.data.error)
          setTimeout(() => {
            message(null)
          }, 5000)
          console.error('Error in handleLogin', error)
        }
    }

    return (
        <div style={{marginTop: '10px'}}>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label="Username"
                        variant='standard'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div style={{marginTop: '10px'}}>
                    <TextField
                        label="password"
                        variant='standard'
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button type='submit' variant="contained" style={{marginTop: '10px'}}>login</Button>
                </div>    
            </form>
        </div>
    )
}

export default LoginForm