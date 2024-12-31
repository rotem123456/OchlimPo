import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import "./MainPage.css";

const BEpath = "http://localhost:4000";

const MainPage = () => {
  // Search values
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
  if (inputValue.length === 0) 
  {
    setSearchResults([]);
    return;
  }

  try {
    const response = await fetch(`${BEpath}/recipe/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: inputValue,
        maxTime: timeToMake,
        tags: tags
      }),
    });

    const data = await response.json();
    console.log("Advanced search results:", data);
    setSearchResults(data);
  } catch (error) {
    console.error("Advanced search error:", error);
    setSearchResults([]);
  }
};

// Call search directly when query changes
React.useEffect(() => {
  handleSearch();
}, [inputValue, timeToMake]); // Trigger search whenever query changes

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (event) => {
    if (event.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  function getTimePassed(datetime) {
    const now = new Date();
    const past = new Date(datetime);
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
    }
  
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'}`;
    }
  
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'}`;
  }  

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }
  
  const TimeSliderBox = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);

    const boxRef = React.useRef(null);
    const boxElement = document.querySelectorAll(".time-box-container")[0];
    if (boxElement !== null && boxElement !== undefined) {
      boxRef.current = boxElement;
    }

    console.log("boxRef", boxElement);

    // Toggle the box visibility
    const toggleBox = () => {
      setIsBoxOpen(!isBoxOpen);
    };
  
    // Handle slider change
    const handleSliderChange = (event) => {
      setTimeToMake(event.target.value);
    };
  
    // Close the box when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          setIsBoxOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="time-button-container">
        <button className="advanced-search-button" style={{width:"150px"}} onClick={toggleBox}>
          {isBoxOpen ? `Takes <= ${timeToMake} Mins` : `Takes <= ${timeToMake} Mins`}
        </button>
        {isBoxOpen && (
          <div
            ref={boxRef}
            className="time-box-container"
          >
            <input
            id="timeSlider"
            type="range"
            min="5"
            max="240"
            step="5"
            value={timeToMake}
            onChange={handleSliderChange}
            style={{
              height: "7px",
              cursor: "pointer",
              padding: "0px",
              boxSizing: "border-box",
              maxWidth: "60%",
              flexShrink: "1"
            }}
          />
          </div>
        )}
      </div>
    );
  };


  const TagsDropdownBox = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const dropdownRef = React.useRef(null);
  
    const toggleBox = () => {
      setIsBoxOpen((prev) => !prev);
    };

    const handleItemClick = (item) => {

      if (tags.includes(item)) {
        setTags((prevTags) => prevTags.filter((tag) => tag !== item));
      }
      else {
        setTags((prevTags) => [...prevTags, item]);
      }
      };
  
    const getDisplayText = () => {
      if (tags.length === 0) return "Tags";
      if (tags.length <= 2) return tags.join(", ");
      return `${tags.slice(0, 2).join(", ")}...`;
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBoxOpen(false);
      }
    };
  
    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const options = ["japanese", "spicy", "meat", "vegitarian"];
  
    return (
      <div className="tags-button-container" ref={dropdownRef}>
        <button
          className="advanced-search-button"
          style={{ pointerEvents: "auto" }}
          onClick={toggleBox}
        >
          {getDisplayText()}
        </button>
        {isBoxOpen && (
          <ul className="tags-box-container">
            {options.map((option, index) => (
              <li
              className="option-label"
              onClick={() => handleItemClick(option)}
              >
                {option}
              </li>
              ))}
          </ul>
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
      <button onClick={() => navigate('/weather')} className="login-button">SURPRISE ME</button>
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
                <h3 className="recipe-item-title">{recipe.name}</h3>
                <p className="recipe-item-description">{recipe.shortDescription}</p>
                <p className="recipe-item-ago">⏳ {getTimePassed(recipe.createdAt)} ago</p>
                <p className="recipe-item-time">🕒 {recipe.time} Mins</p>
                <p className="recipe-item-user">👨‍🍳 {recipe.username}</p>
                <p className="recipe-item-tags">#️⃣ {truncateText(recipe.tags.join(', '), 17)}</p>
              </div>
            ))
          ) : (
            <p></p>
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
