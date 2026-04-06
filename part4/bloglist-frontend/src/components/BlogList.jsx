import Blog from "./Blog"


const BlogList = ({ blogs, user }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div style={{ marginLeft: '5px' }}>
            <h2>blogs</h2>
            {
                sortedBlogs.map(sortedBlog =>
                    <Blog
                        key={sortedBlog.id}
                        blog={sortedBlog}
                        addLike={() => handleLike(sortedBlog.id, sortedBlog)}
                        remove={() => handleRemove(sortedBlog.id)}
                        user={user}
                    />
                )
            }
        </div>
    )
}

export default BlogList