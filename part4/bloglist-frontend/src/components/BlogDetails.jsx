import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = ({ blogs, addLike, remove, user }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    const navigate = useNavigate()

    const removeBlog = async (id) => {
        await remove(id)
        navigate('/blogs')
    }

    if (!blogs) {
        return (
            <div>Blog not found</div>
        )
    }

    return (
        <div>
            <span>{blog?.title} {blog?.author}</span>
            <p>{blog?.url}</p>
            <p>
                likes {blog?.likes}
                {user && (
                    <button onClick={() => addLike(id, blog)}>like</button>
                )}
            </p>
            <p>Added by: {blog?.user?.name}</p>
            {(blog?.user.id === user?.id &&
                <button onClick={() => removeBlog(id)}>remove</button>  
            )}
        </div>
    )
}

export default BlogDetails