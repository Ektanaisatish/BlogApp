import React from "react";
import axios from "axios"
import {
  Avatar,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, BLOG_ENDPOINT } from "../Utils/Constants";

const Blog = ({title, description, imageURL, userName,isUser,id}) => {
  const navigate =useNavigate();
  const handleEdit=()=>{
    navigate(`/myBlogs/${id}`);
  }
  console.log(title,isUser);
  const deleteRequest = async()=>{
    const res = await axios.delete(`${API_BASE_URL}${BLOG_ENDPOINT}/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete=()=>{
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
  };
   return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          //maxWidth: 345,
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}} ><ModeEditOutlineIcon color="warning" /></IconButton>
            <IconButton onClick={handleDelete}><DeleteForeverIcon color="error" /></IconButton>
          </Box>

          
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red " }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
        <hr/>
        <br/>
          <Typography variant="body2" color="text.secondary">
          <b> {userName} </b> {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default Blog;
