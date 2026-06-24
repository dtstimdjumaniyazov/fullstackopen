// import { useState } from 'react'
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <span className="blog-title-author">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </span>
    </div>
  );
};

export default Blog;
