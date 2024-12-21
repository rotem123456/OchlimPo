import React, { useState } from "react";
import "./BloggerPage.css";

const BloggerPage = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const blogger = {
    name: "John Doe",
    image: "\\images\\john.jpg", // Replace with the blogger's image path
    score: 4.5, // Blogger's score out of 5 stars
    recipes: [
      { id: 1, name: "Spaghetti", saves: 51238 },
      { id: 2, name: "Pizza", saves: 46219 },
      { id: 3, name: "Salad", saves: 30158 },
    ],
  };

  const toggleFollow = () => {
    setIsFollowed((prev) => !prev);
  };

  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= score ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="blogger-page">
      <div className="blogger-info">
        <img src={blogger.image} alt={blogger.name} className="blogger-image" />
        <h1 className="blogger-name">{blogger.name}</h1>
        <div className="stars">{renderStars(Math.round(blogger.score))}</div>
        <button className="follow-button" onClick={toggleFollow}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>

      <div className="recipes-section">
        <h2>Popular Recipes</h2>
        <div className="recipes-list">
          {blogger.recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-views">{recipe.saves.toLocaleString()} saves</p>
              <p className="recipe-time">{recipe.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloggerPage;
