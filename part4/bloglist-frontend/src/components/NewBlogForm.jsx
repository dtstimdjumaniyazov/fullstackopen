import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '', author: '', url: ''
    })
  }

  return (
    <>
      <h3>Create a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField 
            label="title"
            sx={{ margin: 1, width: '50%'}}
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            
          />
        </div>
        <div>
          <TextField 
            label="author"
            sx={{ margin: 1, width: '50%'}}
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          <TextField 
            label="URL"
            sx={{ margin: 1, width: '50%'}}
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <Button type='submit' variant='contained' sx={{ mx: 1}}>create</Button>
      </form>
    </>
  )

}

export default NewBlogForm