import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import "./MainPage.css";

const BEpath = "http://localhost:4000";

const MainPage = () => {
  // Search values
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setResults] = useState([]);
  const [timeToMake, setTimeToMake] = useState(60);
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState([]);

  // Other things in page
  const [recipes, setRecipes] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {user,logout} = useAuth();
  let state =  false;

 const handleSearch = async () => {
  if (inputValue.length === 0) return;

  try {
    const response = await fetch(`${BEpath}/recipe/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputValue,
        maxTime: timeToMake,
      }),
    });

    //if (!response.ok) alert(`Failed to fetch search results ${response.status}`);

    const data = [{name: "asfasf"}]//await response.json();
    console.log("Advanced search results:", data);
    setResults(data);
  } catch (error) {
    console.error("Advanced search error:", error);
    setResults([]);
  }
};

// Call search directly when query changes
React.useEffect(() => {
  handleSearch();
}, [inputValue]); // Trigger search whenever query changes

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (event) => {
    if (event.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  const TimeSliderBox = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [timeToMake, setTimeToMake] = useState(0);
  
    const toggleBox = () => {
      setIsBoxOpen(!isBoxOpen);
    };
  
    const handleSliderChange = (event) => {
      setTimeToMake(event.target.value);
    };
  
    return (
      <div style={{
          position: "relative",
          left: "-22%"
         }}>
        <button onClick={toggleBox}>
          {isBoxOpen ? "Maximum Time" : "Maximum Time"}
        </button>
        {isBoxOpen && (
          <div
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: "white"
          }}
          >
            <label htmlFor="timeSlider">Time to Make: {timeToMake}</label>
            <input
              id="timeSlider"
              type="range"
              min="0"
              max="100"
              value={timeToMake}
              onChange={handleSliderChange}
              style={{ width: "80%" }}
            />
          </div>
        )}
      </div>
    );
  };


  const TagsDropdownBox = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const toggleBox = () => {
      setIsBoxOpen(!isBoxOpen);
    };
  
    const handleSelectionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const options = ["Italian", "Vegetarian", "Mexican", "Dairy"]; // Enum-like options
  
    return (
      <div style={{
        position: "relative",
        left: "1%",
        top: "-21px",
        pointerEvents: "none"
       }}>
        <button style={{
        pointerEvents: "auto"
       }} onClick={toggleBox}>
          {isBoxOpen ? "Tags" : "Tags"}
        </button>
        {isBoxOpen && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "200px",
              position: "relative",
              left: "100px",
              backgroundColor: "white",
              pointerEvents: "auto"
            }}
          >
            <label htmlFor="dropdown" style={{ display: "block", marginBottom: "5px" }}>
              Select an Option: {selectedOption || "None"}
            </label>
            <select
              id="dropdown"
              value={selectedOption}
              onChange={handleSelectionChange}
              style={{ width: "100%", padding: "5px", pointerEvents: "auto" }}
            >
              <option value="" disabled>
                -- Select an Option --
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="background">
      {/* Top-right Login and Sign-up buttons */}
      <div className="top-right-buttons">
  {user ? (
    <>
      <span className="user-name">Welcome, {user.name}!</span>
      <button onClick={logout} className="login-button">Logout</button>
    </>
  ) : (
    <>
      <button onClick={() => navigate('/signup')} className="login-button">Sign up</button>
      <button onClick={() => navigate('/login')} className="login-button">Log in</button>
    </>
  )}
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

      <div className="search-container">
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
            onChange={(e) => setInputValue(e.target.value)} // Update query state
          />
        </div>
        <TimeSliderBox />
        <TagsDropdownBox />
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((recipe, index) => (
              <div key={index} className="recipe-item">
                <h3>{recipe.title}</h3>
                <p>Time: {recipe.time} mins</p>
                <p>Tags: {recipe.tags.join(", ")}</p>
              </div>
            ))
          ) : (
            <p>No recipes found. Try another search!</p>
          )}
        </div>
      </div>

      {/* Centered plate content */}
      <div className="plate-content">
        <h1 className="title">OchlimPo</h1>
        <p className="plate-text">
          Welcome to OchlimPo, your hub for discovering and sharing amazing
          recipes!
        </p>
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
