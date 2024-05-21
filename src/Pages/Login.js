// Login.js
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    Axios.post("http://localhost:3001/login", { user, password })
      .then((response) => {
        if (response.data.success) {
          setMessage("Login successful");
          navigate("/menu");
        } else {
          setMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error occurred. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Username:</span>
            <input
              type="text"
              className="form-control"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Password:</span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <p className="mt-3">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
