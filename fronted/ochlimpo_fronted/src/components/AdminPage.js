import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, name: "Spaghetti" },
    { id: 2, name: "Pizza" },
    { id: 3, name: "Salad" },
  ]);

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    alert("Recipe deleted successfully!");
  };

  const editRecipe = (id) => {
    const newName = prompt("Enter the new name for this recipe:");
    if (newName) {
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, name: newName } : recipe
      );
      setRecipes(updatedRecipes);
      alert("Recipe updated successfully!");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Welcome, Admin</h1>
      <div className="recipes-list">
        <h2>All Recipes</h2>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-admin-card">
            <h3>{recipe.name}</h3>
            <button
              className="edit-button"
              onClick={() => editRecipe(recipe.id)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteRecipe(recipe.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
