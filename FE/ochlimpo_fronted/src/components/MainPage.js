import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./MainPage.css";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addRecipe = () => {
    alert("Add recipe clicked");
  };

  const addBlogger = () => {
    alert("Add blogger clicked");
  };

  const addRestaurant = () => {
    alert("Add restaurant clicked");
  };

  return (
    <div className="background">
      {/* Left rectangle - My Profile */}
      <div className="my-profile">
        <h2 className="profile-title">My Profile</h2>
        
        {/* My Recipes Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My Recipes</h3>
            <button className="add-button" onClick={addRecipe}>
              +
            </button>
          </div>
          <div className="section-content">
            {recipes.length === 0 ? <p>No recipes yet</p> : recipes.map((recipe, index) => <p key={index}>{recipe}</p>)}
          </div>
        </div>

        {/* My List of Bloggers Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My List of Bloggers</h3>
            <button className="add-button" onClick={addBlogger}>
              +
            </button>
          </div>
          <div className="section-content">
            {bloggers.length === 0 ? <p>No bloggers yet</p> : bloggers.map((blogger, index) => <p key={index}>{blogger}</p>)}
          </div>
        </div>

        {/* My List of Restaurants Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>My List of Restaurants</h3>
            <button className="add-button" onClick={addRestaurant}>
              +
            </button>
          </div>
          <div className="section-content">
            {restaurants.length === 0 ? <p>No restaurants yet</p> : restaurants.map((restaurant, index) => <p key={index}>{restaurant}</p>)}
          </div>
        </div>
      </div>

      {/* Centered plate content */}
      <div className="plate-content">
        <h1 className="title">OchlimPo</h1>

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
            placeholder={inputValue ? "" : "Search for recipes..."}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <button className="button">Sign Up</button>
        <button className = "button" onClick={() => navigate('/login')}>Sign In</button>
      </div>
    </div>
  );
};

export default MainPage;
