import React, { useState } from "react";
import "./BloggerPage.css";

const BloggerPage = () => {
  const [recipes, setRecipes] = useState([]);

  const uploadRecipe = () => {
    const recipeName = prompt("Enter the name of your recipe:");
    if (recipeName) {
      setRecipes([...recipes, recipeName]);
      alert(`Your recipe "${recipeName}" has been uploaded!`);
    }
  };

  return (
    <div className="blogger-page">
      <h1 className="blogger-title">Welcome, Blogger</h1>
      <button className="upload-button" onClick={uploadRecipe}>
        Upload New Recipe
      </button>
      <div className="uploaded-recipes">
        <h2>Your Recipes</h2>
        {recipes.length === 0 ? (
          <p>You haven't uploaded any recipes yet.</p>
        ) : (
          recipes.map((recipe, index) => <p key={index}>{recipe}</p>)
        )}
      </div>
    </div>
  );
};

export default BloggerPage;
