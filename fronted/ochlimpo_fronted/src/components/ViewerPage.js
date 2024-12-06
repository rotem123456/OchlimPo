import React, { useState } from "react";
import "./ViewerPage.css";

const ViewerPage = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const likeRecipe = (recipe) => {
    if (!likedRecipes.includes(recipe)) {
      setLikedRecipes([...likedRecipes, recipe]);
      alert(`You liked "${recipe}"!`);
    }
  };

  const saveRecipe = (recipe) => {
    if (!savedRecipes.includes(recipe)) {
      setSavedRecipes([...savedRecipes, recipe]);
      alert(`You saved "${recipe}" to your favorites!`);
    }
  };

  return (
    <div className="viewer-page">
      <h1 className="viewer-title">Welcome, Viewer</h1>
      <div className="recipes-section">
        <h2>Recipes</h2>
        <div className="recipe-card" onClick={() => likeRecipe("Spaghetti")}>
          <h3>Spaghetti</h3>
          <button className="like-button">Like</button>
          <button className="save-button" onClick={(e) => {e.stopPropagation(); saveRecipe("Spaghetti");}}>
            Save
          </button>
        </div>
        <div className="recipe-card" onClick={() => likeRecipe("Pizza")}>
          <h3>Pizza</h3>
          <button className="like-button">Like</button>
          <button className="save-button" onClick={(e) => {e.stopPropagation(); saveRecipe("Pizza");}}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
