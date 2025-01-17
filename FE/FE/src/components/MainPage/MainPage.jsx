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
  const [all_tags, setAllTags] = useState([]);
  const [all_ingredients, setAllIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [isTimeBoxOpen, setIsTimeBoxOpen] = useState(false);
  const [isTagsBoxOpen, setIsTagsBoxOpen] = useState(false);
  const [isIngredientsBoxOpen, setIsIngredientsBoxOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  // Other things in page
  const [recipes, setRecipes] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {user,logout} = useAuth();
  let state =  false;

  const fetchTags = async () => {
    try {
      const response = await fetch(`${BEpath}/recipe/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
  
      const data = await response.json();
      setAllTags(data);
    } catch (error) {
      console.error("Tags fetch error:", error);
      setAllTags([]);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`${BEpath}/recipe/ingredients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
  
      const data = await response.json();

      console.log("ings:", data);
      setAllIngredients(data);
    } catch (error) {
      console.error("Tags fetch error:", error);
      setAllIngredients([]);
    }
  };

 const handleSearch = async () => {
  if (inputValue.length === 0) 
  {
    setSearchResults([]);
    return;
  }

  console.log("tags:", tags);
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

  // This will be called every time the page is loaded
  React.useEffect(() => {
    fetchTags();
    fetchIngredients();
  }, []);

  // Call search directly when query changes
  React.useEffect(() => {
    handleSearch();
  }, [inputValue, timeToMake, tags, ingredients]); // Trigger search whenever query changes

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


  const ResultsFilterDropdownBox = () => {
    const elementRef = React.useRef(null);
    const filterOptions = [
      "Newest",
      "Oldest",
      "Fastest",
      "Slowest",
      "Least Ingredients",
      "Most Ingredients",
    ];

    const toggleFilterBox = () => {
      setIsFilterBoxOpen(!isFilterBoxOpen);
    };

    const handleItemClick = (item) => {
      setIsFilterBoxOpen(true);
      // add here
    };

    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsFilterBoxOpen(false);
      }
    };
  
    React.useEffect(() => {
      // Attach event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="filter-button-container"
      ref={elementRef}>
        <button
          className="advanced-search-button"
          onClick={toggleFilterBox}
        >
           <img
            src="/images/filter-32.png"
            style={{
              maxWidth: '30px',
              maxHeight: '30px',
              width: '50%',
              height: 'auto'
            }}
            />
        </button>
        {isFilterBoxOpen && (
          <ul className="filter-box-container">
            {filterOptions.map((option, index) => (
              <li
              className="option-label"
              onClick={(e) => handleItemClick(option)}
              id = {index}
              >
                {tags.includes(option) ? `${option} ✔️` : option}
              </li>
              ))}
          </ul>
        )}
      </div>
    );
  };

  const TimeSliderBox = () => {
    const elementRef = React.useRef(null);

    // Toggle the box visibility
    const toggleBox = () => {
      setIsTimeBoxOpen(!isTimeBoxOpen);
    };
  
    // Handle slider change
    const handleSliderChange = (event) => {
      setTimeToMake(event.target.value);
    };

    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsTimeBoxOpen(false);
      }
    };
  
    React.useEffect(() => {
      // Attach event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  
    return (
      <div className="time-button-container"
      ref={elementRef}>
        <button className="advanced-search-button" style={{width:"150px"}} onClick={toggleBox}>
          {isTimeBoxOpen ? `Takes <= ${timeToMake} Mins` : `Takes <= ${timeToMake} Mins`}
        </button>
        {isTimeBoxOpen && (
          <div
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
    const elementRef = React.useRef(null);

    const toggleTagsBox = () => {
      setIsTagsBoxOpen(!isTagsBoxOpen);
    };

    const handleItemClick = (item) => {
      setIsTagsBoxOpen(true);
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
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsTagsBoxOpen(false);
      }
    };
  
    React.useEffect(() => {
      // Attach event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="tags-button-container"
      ref={elementRef}>
        <button
          className="advanced-search-button"
          onClick={toggleTagsBox}
        >
          {getDisplayText()}
        </button>
        {isTagsBoxOpen && (
          <ul className="tags-box-container">
            {all_tags.map((option, index) => (
              <li
              className="option-label"
              onClick={(e) => handleItemClick(option)}
              id = {index}
              >
                {tags.includes(option) ? `${option} ✔️` : option}
              </li>
              ))}
          </ul>
        )}
      </div>
    );
  };

  const IngredientsDropdownBox = () => {
    const elementRef = React.useRef(null);

    const toggleIngredientsBox = () => {
      setIsIngredientsBoxOpen(!isIngredientsBoxOpen);
    };

    const handleItemClick = (item) => {
      setIsIngredientsBoxOpen(true);
      if (ingredients.includes(item)) {
        setIngredients((prevIngredients) => prevIngredients.filter((ing) => ing !== item));
      }
      else {
        setIngredients((prevIngredients) => [...prevIngredients, item]);
      }
    };
  
    const getDisplayText = () => {
      if (ingredients.length === 0) return "Ingredients";
      if (ingredients.length <= 2) return ingredients.join(", ");
      return `${ingredients.slice(0, 2).join(", ")}...`;
    };

    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsIngredientsBoxOpen(false);
      }
    };
  
    React.useEffect(() => {
      // Attach event listener to the document
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="ingredients-button-container"
      ref={elementRef}>
        <button
          className="advanced-search-button"
          onClick={toggleIngredientsBox}
        >
          {getDisplayText()}
        </button>
        {isIngredientsBoxOpen && (
          <ul className="ingredients-box-container">
            {all_ingredients.map((option, index) => (
              <li
              className="option-label"
              onClick={(e) => handleItemClick(option)}
              id = {index}
              >
                {ingredients.includes(option) ? `${option} ✔️` : option}
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
    <button onClick={logout} className="main-upload-button">
    <img
        src="/images/plus-sign.png"
        style={{ 
          width: '28px', 
          height: '28px',
          alignItems: 'left',
          display: 'inline-block',
         }}
      ></img>
      Upload Recipe
    </button>
    <img
        src="/images/user-icon.png"
        alt="user-icon"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        style={{ cursor: 'pointer' }}
        className="user-menu"
      />
      {isUserMenuOpen && (
          <div
            className="user-menu-box-container"
          >
            <span className="user-name">Welcome, {user.name}!</span>
          <button onClick={logout} className="login-button" style={{ right: "0px" }}>Logout</button>
          </div>
        )}
      
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
          {(inputValue.length > 0) && (<button className="clear-search-button" onClick={() => setInputValue("")}>
            <span role="img" aria-label="search">
              x
            </span>
          </button>)}
        </div>
        <ResultsFilterDropdownBox />
        <TimeSliderBox />
        <TagsDropdownBox />
        <IngredientsDropdownBox />
        <div className="surprise-button-container">
           <button onClick={() => navigate('/weather')} 
            className="advanced-search-button"
            style={{width:"165%"}}
            >
            I'm Feeling Lazy...
           </button>
        </div>
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
