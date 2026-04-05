import { useState } from 'react'

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
          <label>
                    title
            <input
              type='text'
              value={newBlog.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
                    author
            <input
              type='text'
              value={newBlog.author}
              onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
                    URL
            <input
              type='text'
              value={newBlog.url}
              onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )

}

export default NewBlogForm