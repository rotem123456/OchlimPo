import React, { useState } from "react";
import "./Loginpage.css";

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("/api/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password })
     });
     if (response.ok) {
       window.location.href = "/";
     }
   } catch (error) {
     console.error("Login failed:", error);
   }
 };

 return (
   <div className="backgroundSignUp">
     <h1></h1>
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