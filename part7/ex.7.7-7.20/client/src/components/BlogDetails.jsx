import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Box } from '@mui/material'

const BlogDetails = ({ blogs, addLike, remove, user }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    const navigate = useNavigate()

    const removeBlog = async (id) => {
        await remove(id)
        navigate('/')
    }

    if (!blogs) {
        return (
            <div>Blog not found</div>
        )
    }

    return (
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mt: 2 }}>
            <Typography variant="h4">{blog?.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">by {blog?.author}</Typography>
            <Typography component="a" href={blog?.url} sx={{ display: 'block', my: 1 }}>{blog?.url}</Typography>
            <Typography>Added by: {blog?.user?.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography>{blog?.likes} likes</Typography>
                {user && (
                    <Button variant="outlined" onClick={() => addLike(id, blog)}>like</Button>
                )}
                {blog?.user?.id === user?.id && (
                    <Button variant="outlined" color="error" onClick={() => removeBlog(id)}>remove</Button>
                )}
            </Box>
        </Box>
    )
}

export default BlogDetails