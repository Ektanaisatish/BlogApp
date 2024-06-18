import {addurl} from "../Utils/Constants"
import React ,{useState} from "react";
import axios from 'axios';
import { Box, Typography, TextField, InputLabel, Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';

const AddBlog = () => {
  const navigate= useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
const handleChange =(e) =>{
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};
const sendRequest = async ()=>{
  const res =await axios.post(addurl,{
    title:inputs.title,
    description:inputs.description,
    image:inputs.imageURL,
    user: localStorage.getItem("userId"),
  }).catch((err) => console.log(err));
  const data =await res.data;
  return data;
};

const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(inputs);
  sendRequest().then((data) =>console.log(data)).then(()=>navigate("/blogs"));
};


  return (<div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="pink"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc "
          padding={3}
          margin='auto'
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
            Post your blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "Bold" }}
          >
            {" "}
            Title
          </InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined"></TextField>

          <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "Bold" }}
          >Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined"></TextField>

          <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "Bold" }}> ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant="outlined"></TextField>
        <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    </div>);
};

export default AddBlog;
