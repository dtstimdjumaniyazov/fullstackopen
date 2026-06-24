import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationActions, useUserActions } from "../store/store";
import { TextField, Button } from "@mui/material";
import { useField } from "./hooks";


const LoginForm = () => {
  const { login } = useUserActions()
  const { errorNotification } = useNotificationActions()
  const username = useField('text')
  const password = useField('password')
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      await login(username.value, password.value)
      navigate("/");
    } catch (error) {
      errorNotification(error.response.data.error);
      setTimeout(() => {
        errorNotification(null);
      }, 5000);
      console.error("Error in handleLogin", error);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            name="username"
            variant="standard"
            {...username}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <TextField
            label="password"
            name="password"
            variant="standard"
            type="password"
            {...password}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
