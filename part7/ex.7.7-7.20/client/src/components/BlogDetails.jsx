import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useBlogActions, useBlogsStore } from "../store/store";

const BlogDetails = ({ user }) => {
  const blogs = useBlogsStore()
  const { addLike, removeBlog, addComment } = useBlogActions()
  
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    addComment(id, comment)
    event.target.reset()    
  }

  if (!blogs) {
    return <div>Blog not found</div>;
  }

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 2 }}>
      <Typography variant="h4">{blog?.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        by {blog?.author}
      </Typography>
      <Typography
        component="a"
        href={blog?.url}
        sx={{ display: "block", my: 1 }}
      >
        {blog?.url}
      </Typography>
      <Typography>Added by: {blog?.user?.name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Typography>{blog?.likes} likes</Typography>
        {user && (
          <Button variant="outlined" onClick={() => addLike(id)}>
            like
          </Button>
        )}
        {blog?.user?.id === user?.id && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              removeBlog(id)
              navigate('/')
            }}
          >
            remove
          </Button>
        )}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mt: 3 }}>comments</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="add comment"
            size="small"
            name="comment"
          />
          <Button variant="contained" sx={{ ml: 2 }} size="large" type="submit">
            Add comment
          </Button>
        </form>
        <ul>
          {blog?.comments?.map(c => {
            return (<li key={c}>{c}</li>)
          })}
        </ul>
      </Box>
    </Box>
  );
};

export default BlogDetails;
