import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const BEpath = "http://localhost:4000";

  const checkPasswordsMatch = (pass1, pass2) => {
    if (pass1 === pass2) {
      alert("Passwords match");
    } else {
      alert("Passwords don't match");
    }
  };

  const addUser = async (name) => {
    alert(`Welcome ${name} to OchlimPo`);
    await sleep(5000);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BEpath}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, type })
      });
      if (response.ok) {
        addUser(name);
        

      }
    } catch (error) {
      console.error("SignUp Failed", error);
    }
  };

  return (
    <div className="background">
      <div className="plate-content bg-white/90 rounded-3xl p-8 shadow-lg max-w-md w-full mx-auto">
        <h1 className="title text-2xl mb-4 text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="search-input w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 text-xl focus:border-gray-500 focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="search-input w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 text-xl focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="search-input w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 text-xl focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="search-input w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 text-xl focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="User Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="search-input w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 text-xl focus:border-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => checkPasswordsMatch(password, password2)}
              
            >
              Verify Password Match
            </button>

            <button
              type="submit"
             
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;