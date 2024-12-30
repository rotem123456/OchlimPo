import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BloggerPage.css";

const BloggerPage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const uploadRecipe = () => {
      navigate("/upload_recipes");
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
