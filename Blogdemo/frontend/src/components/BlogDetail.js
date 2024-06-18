import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  API_BASE_URL,
  BLOG_ENDPOINT,
  UPDATE_BLOG_ENDPOINT,
} from "../Utils/Constants";
import { Box, Typography, TextField, InputLabel, Button } from "@mui/material";
const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`${API_BASE_URL}${BLOG_ENDPOINT}/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`${API_BASE_URL}${UPDATE_BLOG_ENDPOINT}/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="pink"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc "
            padding={3}
            margin="auto"
            marginTop={3}
            marginBottom={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="gray"
              variant="h2"
              textAlign={"center"}
            >
              Update your blog
            </Typography>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "Bold" }}
            >
              {" "}
              Title
            </InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            ></TextField>

            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "Bold" }}
            >
              Description
            </InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            ></TextField>
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}{" "}
    </div>
  );
};

export default BlogDetail;
