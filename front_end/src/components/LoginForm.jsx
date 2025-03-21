import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
          body: JSON.stringify({ username, password }),
        });
    
        const result = await response.json();
    
        if (response.status === 200) {
          console.log("Login successful!");
          window.location.href = "http://localhost:5173/groupmessage";
        } else {
          console.error("Login failed");
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong.");
      }
    };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="signup-input-group">
            <input
              type="text"
              placeholder="Username"
              className="input1"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input1"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <p className="switch-text">{message}</p>
        <p className="switch-text">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;