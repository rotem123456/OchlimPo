import React, { useState } from "react";
import "./ViewerPage.css";

const ViewerPage = () => {
  const viewer = {
    name: "Jane Viewer",
    image: "/images/john.jpg", // Replace with the viewer's image path
  };

  const [bloggers] = useState([
    { id: 1, name: "John Doe", image: "/images/john.jpg", score: 4.5 },
    { id: 2, name: "Jane Smith", image: "/images/jane.jpg", score: 4.0 },
    { id: 3, name: "Chef Alex", image: "/images/alex.jpg", score: 5.0 },
  ]);

  const [savedRecipes] = useState([
    { id: 1, name: "Spaghetti", image: "/images/spaghetti.jpg", views: 51238 },
    { id: 2, name: "Pizza", image: "/images/pizza.jpg", views: 46219 },
    { id: 3, name: "Salad", image: "/images/salad.jpg", views: 30158 },
  ]);

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
    <div className="viewer-page">
      {/* Viewer Info Section */}
      <div className="viewer-info">
        <img src={viewer.image} alt={viewer.name} className="viewer-image" />
        <h1 className="viewer-name">{viewer.name}</h1>
      </div>

      {/* Content Section: Side-by-side layout */}
      <div className="content-section">
        {/* Bloggers Section */}
        <div className="bloggers-section">
          <h2>Followed Bloggers</h2>
          <div className="bloggers-list">
            {bloggers.map((blogger) => (
              <div key={blogger.id} className="blogger-item">
                <img
                  src={blogger.image}
                  alt={blogger.name}
                  className="blogger-image"
                />
                <div className="blogger-info">
                  <h3 className="blogger-name">{blogger.name}</h3>
                  <div className="stars">{renderStars(Math.round(blogger.score))}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Recipes Section */}
        <div className="recipes-section">
          <h2>Saved Recipes</h2>
          <div className="recipes-list">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-item">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                />
                <div className="recipe-info">
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <p className="recipe-views">{recipe.views.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
