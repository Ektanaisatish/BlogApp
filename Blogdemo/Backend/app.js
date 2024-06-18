import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user-routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import blogRoute from "./routes/blog-routes.js";
import { signup, login } from "./controllers/user-controller.js";
import {
  addBlog,
  updateBlog,
  getById,
  deleteBlog,    
  getByUserId,  
} from "./controllers/blog-controller.js";


const app = express();
app.use(cors()); 

app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ekta:naiekta@cluster0.cjudrsp.mongodb.net/")
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listen on localhost 5000"))

  .catch((err) => console.log(err));
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);                //http://localhost:5000/api/blog


app.use("/api/add", addBlog);                   //http://localhost:5000/api/add
app.use("/signup", signup); 
app.use("/login", login);                       //http://localhost:5000/api/user/login
app.use("/update", updateBlog);                 //http://localhost:5000/api/blog/update/65d4b55c9fefe0777c9f0b91
app.use("/:id", getById);                       //http://localhost:5000/api/blog/65d589c8f7c85626f871192e
app.use("/:id", deleteBlog);
app.use("/getuser/:id",getByUserId);
