import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./MainPage.css";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (event) => {
    if (event.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  return (
    <div className="background">
      {/* Top-right Login and Sign-up buttons */}
      <div className="top-right-buttons">
        <button onClick={() => navigate('/signup')} className="signup-button">Sign up</button>
        <button onClick={() => navigate('/login')} className="login-button">Log in</button>
      </div>

      {/* Left rectangle - My Profile */}
      <div className="my-profile">
        <h2 className="profile-title">My Profile</h2>

        {/* My Recipes Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My Recipes</h3>
            <button className="add-button" onClick={openModal}>
              +
            </button>
          </div>
          <div className="section-content">
            {recipes.length === 0 ? (
              <p>No recipes yet</p>
            ) : (
              recipes.map((recipe, index) => <p key={index}>{recipe}</p>)
            )}
          </div>
        </div>

        {/* My List of Bloggers Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My List of Bloggers</h3>
            <button className="add-button" onClick={openModal}>
              +
            </button>
          </div>
          <div className="section-content">
            {bloggers.length === 0 ? (
              <p>No bloggers yet</p>
            ) : (
              bloggers.map((blogger, index) => <p key={index}>{blogger}</p>)
            )}
          </div>
        </div>

        {/* My List of Restaurants Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My List of Restaurants</h3>
            <button className="add-button" onClick={openModal}>
              +
            </button>
          </div>
          <div className="section-content">
            {restaurants.length === 0 ? (
              <p>No restaurants yet</p>
            ) : (
              restaurants.map((restaurant, index) => (
                <p key={index}>{restaurant}</p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Centered plate content */}
      <div className="plate-content">
        <h1 className="title">OchlimPo</h1>
        <p className="plate-text">
          Welcome to OchlimPo, your hub for discovering and sharing amazing
          recipes!
        </p>

        {/* Search Box */}
        <div className="search-box">
          <button className="magnifying-glass-button">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search for recipes..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Modal for Sign In/Sign Up */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <h2>Welcome to OchlimPo</h2>
            <p>
              Please sign in if you already have an account, or sign up if
              you're new!
            </p>
            <button className="button" onClick={() => setShowModal(false)}>
              Sign In
            </button>
            <button className="button" onClick={() => setShowModal(false)}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
