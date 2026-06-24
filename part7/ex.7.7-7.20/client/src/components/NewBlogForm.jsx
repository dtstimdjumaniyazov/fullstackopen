import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useField } from "./hooks";

const NewBlogForm = () => {
  const navigate = useNavigate()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const { addBlog } = useBlogActions()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({
      title: title.value, 
      author: author.value, 
      url: url.value
    })
    event.target.reset()
    navigate("/")
  };

  return (
    <>
      <h3>Create a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="title"
            sx={{ margin: 1, width: "50%" }}
            name="title"
            {...title}
          />
        </div>
        <div>
          <TextField
            label="author"
            sx={{ margin: 1, width: "50%" }}
            name="author"
            {...author}
          />
        </div>
        <div>
          <TextField
            label="URL"
            sx={{ margin: 1, width: "50%" }}
            name="url"
            {...url}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mx: 1 }}>
          create
        </Button>
      </form>
    </>
  );
};

export default NewBlogForm;
