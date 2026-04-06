import Blog from './Blog'


const BlogList = ({ blogs, user, addLike, remove }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div style={{ marginLeft: '5px' }}>
      <h2>blogs</h2>
      {
        sortedBlogs.map(sortedBlog =>
          <Blog
            key={sortedBlog.id}
            blog={sortedBlog}
            addLike={() => addLike(sortedBlog.id, sortedBlog)}
            remove={() => remove(sortedBlog.id)}
            user={user}
          />
        )
      }
    </div>
  )
}

export default BlogList