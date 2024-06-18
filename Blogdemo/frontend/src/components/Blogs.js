import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import {getblogs} from "../Utils/Constants";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(getblogs);
        const data = res.data;
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    fetchBlogs().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs &&
      
      blogs.map((blog,index) => (
        <Blog  
          isUser={localStorage.getItem("userId")===blog.user._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user.name}
        />
      ))}
    </div>
  );
};

export default Blogs;
