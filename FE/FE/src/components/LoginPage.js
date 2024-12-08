import React, { useState } from "react";
import "./Loginpage.css";

const BEpath = "http://localhost:4000/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch(`${BEpath}user/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.status === 200) {
        alert("Welcome!");
        console.log("passwords are equal");
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
    <div className="background">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;