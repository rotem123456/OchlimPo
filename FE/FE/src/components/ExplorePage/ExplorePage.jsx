import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { getTimePassed, truncateText } from '../../utils/utils';
import "./ExplorePage.css";

const BEpath = "http://localhost:4000";

const ExplorePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [errorInSearch, setErrorInSearch] = useState(false);
    const { user , logout} = useAuth();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    
    const getRecipesFromLikedUsers = async () => {
    
        if (!user) {
            console.error("User not logged in");
            return;
        }

        try {

          const response = await fetch(`${BEpath}/recipe/feed/${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          });

          const data = await response.json();
          console.log("Advanced search results:", data);
          if (data.error) {
            setErrorInSearch(true);
            setRecipes([]);
            return;
          }
          else {
            setErrorInSearch(false);
            setRecipes(data);
          }
        } catch (error) {
          console.error("Recipe Fetch Error:", error);
          setErrorInSearch(true);
          setRecipes([]);
        }
      };

     // This will be called every time the page is loaded
    React.useEffect(() => {
        getRecipesFromLikedUsers();
    }, []);
    
    const handleRecipeClick = (recipe) => {
        navigate(`/recipe/${recipe.id}`);
    };
    
    return (
        <div className="explore-page">
          <div className="top-right-buttons">
          {user ? (
    <>
    <button onClick={() => navigate("/upload")} className="main-upload-button">
      <img
          src="/images/plus-sign.png"
          style={{
            width: '22px',
            height: '22px',
            display: 'inline-block',
          }}
        ></img>
        <span style={{marginLeft: "10px", marginTop: "0px"}}>Create</span>
    </button>
    <img
        src="/images/user-icon.png"
        alt="user-icon"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        style={{ 
          width: '50px',
          height: '50px',
          cursor: 'pointer' 
        }}
        className="user-menu"
      />
      
      {isUserMenuOpen && (
          <div
            className="user-menu-box-container"
          >
            <span className="user-name">Welcome, {user.name}!</span>
          <button onClick={logout} className="logout-button" style={{ right: "0px" }}>Logout</button>
          </div>
        )}
      
    </>
  ) : (
    <>
      <button onClick={() => navigate('/signup')} className="signup-button-main">Sign up</button>
      <button onClick={() => navigate('/login')} className="login-button-main">Log in</button>
    </>
  )}
          </div>
            <h1> Recent Uploads By Your Favorite Creators </h1>
            <div className="recipes-explore-container">
            {(!errorInSearch && recipes.length > 0) ? (
              recipes.map((recipe) => (
                <div key={recipe.id} className="explore-recipe-card" onClick={() => handleRecipeClick(recipe)}>
                    <h2 className="explore-recipe-title">{recipe.name}</h2>
                    <p className="explore-recipe-description">{truncateText(recipe.shortDescription, 300)}</p>
                    <p className="explore-recipe-ingredients">🍳 Required Ingredients: {truncateText(recipe.ingredients.join(', '), 50)}</p>
                    <p className="explore-recipe-ago">⏳ {getTimePassed(recipe.createdAt)} ago</p>
                    <p className="explore-recipe-time">🕒 {recipe.time} Mins</p>
                    <p className="explore-recipe-user">👨‍🍳 {truncateText(recipe.username, 10)}</p>
                    <p className="explore-recipe-tags">#️⃣ {truncateText(recipe.tags.join(', '), 18)}</p>
                    <p className="explore-recipe-likes">❤️ {recipe.likes}</p>
                </div>
                ))
                ) : (
                (recipes.length === 0) &&
                <div className="explore-recipe-card">
                    <h2 className="explore-recipe-title">{(errorInSearch) ? ("An Error Occured While Fetching Recipes") : ("Your Liked Bloggers Didn't Publish Any Recipes Yet")}</h2>
                </div>
              )} 
            </div>
        </div>
    );
};

export default ExplorePage;
