
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";

const BEpath = "http://localhost:4000/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${BEpath}user/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();
     
      if (response.status === 200) {
        console.log(data)
        login(data.user, data.token);
        navigate('/')
      } else if (response.status === 401) {
        alert("Incorrect username or password");
      } else {
        alert("An error occurred during login");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Connection error. Please try again.");
    }
  };

  return (
    <div className="backgroundLogin">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className = "login-button" type="submit">Login</button>
        <p>
      <button className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </button>
      </p>
      </form>
      
    </div>
  );
};

export default Login;