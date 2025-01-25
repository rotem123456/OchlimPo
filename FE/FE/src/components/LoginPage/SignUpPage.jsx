import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import "./Loginpage.css";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const BEpath = "http://localhost:4000";
  const { login } = useAuth();


  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
  };

  const checkPasswordsMatch = (pass1, pass2) => {
   if(pass1==="")
   {
      alert("PassWord cant be null")
      return;
   }
   if(pass1===pass2)
   {
    alert("Passwords Match")
   }
   else{
    alert("Passwords dont Match!")
   }
  };

  const emailCheck = async (email) => {
    try {
      const response = await fetch(`${BEpath}/user/email/${email}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      if(response.status === 404) {
        alert("Email is Valid");
      }
      if(response.status === 201) {
        alert("Email is already used");
      }
    } catch (error) {
      console.log(error, "error checking email");
    }
  };

  const addUser = async (name) => {
    alert(`Welcome ${name} to OchlimPo`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BEpath}/user/create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, name, password, type })
      });
      
      if (response.ok) {
        await addUser(name);
        const data = await response.json();
        login(data.user,data.token)
        sleep(1000)
        navigate('/')

      }
    } catch (error) {
      console.error("SignUp Failed", error);
    }
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="backgroundSignUp">
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '600px'  // Make container wider
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          alignSelf: 'flex-start'
        }}>Sign Up</h1>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ 
                width: '100%',
                height: '45px',
                fontSize: '1.1rem',
                padding: '0 15px'
              }}
            />
          </div>
          
          <div className="form-group" style={{ 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                flex: 1,
                height: '45px',
                fontSize: '1.1rem',
                padding: '0 15px'
              }}
            />
            <button 
              type="button" 
              onClick={() => emailCheck(email)}
              style={{ 
                whiteSpace: 'nowrap',
                height: '45px',
                padding: '0 20px'
              }}
            >
              Email Check
            </button>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%',
                height: '45px',
                fontSize: '1.1rem',
                padding: '0 15px'
              }}
            />
          </div>

          <div className="form-group" style={{ 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              style={{ 
                flex: 1,
                height: '45px',
                fontSize: '1.1rem',
                padding: '0 15px'
              }}
            />
            <button 
              type="button" 
              onClick={() => checkPasswordsMatch(password, password2)}
              style={{ 
                whiteSpace: 'nowrap',
                height: '45px',
                padding: '0 20px'
              }}
            >
              Verify Match
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '15px',
            width: '100%'
          }}>
            <button
              type="button"
              onClick={() => handleTypeSelect('BLOGGER')}
              style={{ 
                flex: 1,
                height: '45px',
                padding: '0 15px',
                backgroundColor: type === 'BLOGGER' ? '#e0e0e0' : 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              BLOGGER
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect('POSTER')}
              style={{ 
                flex: 1,
                height: '45px',
                padding: '0 15px',
                backgroundColor: type === 'POSTER' ? '#e0e0e0' : 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              POSTER
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect('VIEWER')}
              style={{ 
                flex: 1,
                height: '45px',
                padding: '0 15px',
                backgroundColor: type === 'VIEWER' ? '#e0e0e0' : 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              VIEWER
            </button>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="User Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={{ 
                width: '100%',
                height: '45px',
                fontSize: '1.1rem',
                padding: '0 15px',
                backgroundColor: '#f8f8f8',  // Slightly grayed out to indicate it's set by buttons
                cursor: 'default'
              }}
              readOnly  // Make it read-only since it's set by buttons
            />
          </div>

          <button 
            type="submit"
            style={{ 
              width: '100%',
              height: '45px',
              fontSize: '1.1rem'
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;