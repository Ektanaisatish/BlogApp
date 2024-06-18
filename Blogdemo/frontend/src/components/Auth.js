import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { API_BASE_URL, loginurl } from "../Utils/Constants";
import toast from 'react-hot-toast';
export const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email || !emailRegex.test(inputs.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }
    if (!inputs.password || inputs.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendRequest = async (type = "login") => {
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error(" Invalid  credential");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const data = await sendRequest("signup");
      if (data) {
        setSignupSuccess(true); 
        toast.success("Successfully signed up.");
      }
    } else {
      const data = await sendRequest();
      if (data) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login());
        navigate("/blogs");
        toast.success("Login Successfully");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
          {signupSuccess && (
            <Typography variant="body1" padding={3} textAlign={"center"}>
              Sign up successful. Please proceed to login.
            </Typography>
          )}
        </Box>
      </form>
    </div>
  );
};

export default Auth;
