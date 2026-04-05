import { useState } from 'react'

const Blog = ({ blog, addLike, remove, user }) => {
  const [visible, setVisible] = useState(false)
  
  return (
    <div className="blog">
      <span className="blog-title-author">
        {blog.title} {blog.author}
      </span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={addLike}>like</button>
          </p>
          <p>Added by: {blog?.user?.name}</p>
          {(user && blog.user.id === user.id &&
            <button onClick={remove}>remove</button>  
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
