import React, { useState } from "react";
import "./SecondPage.css";

const SecondPage = () => {
  const [recipes] = useState([
    { id: 1, name: "Spaghetti", image: "/images/spaghetti.jpg" },
    { id: 2, name: "Pizza", image: "/images/pizza.jpg" },
    { id: 3, name: "Salad", image: "/images/salad.jpg" },
  ]);

  const [bloggers] = useState([
    { id: 1, name: "John Doe", image: "/images/john.jpg" },
    { id: 2, name: "Jane Smith", image: "/images/jane.jpg" },
    { id: 3, name: "Chef Alex", image: "/images/alex.jpg" },
  ]);

  const [restaurants] = useState([
    { id: 1, name: "Italian Bistro", image: "/images/bistro.jpg" },
    { id: 2, name: "Sushi World", image: "/images/sushi.jpg" },
    { id: 3, name: "BBQ Heaven", image: "/images/bbq.jpg" },
  ]);

  return (
    <div className="second-page">
      {/* <h1 className="title">Welcome to the Second Page</h1> */}
      <div className="scrolling-rectangle">
        {/* Popular Recipes */}
        <div className="row">
          <h3 className="row-title">Popular Recipes</h3>
          <div className="items-container">
            {recipes.map((recipe) => (
              <button key={recipe.id} className="item-button">
                <img src={recipe.image} alt={recipe.name} className="circle-image" />
                <span className="item-name">{recipe.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Bloggers */}
        <div className="row">
          <h3 className="row-title">Popular Bloggers</h3>
          <div className="items-container">
            {bloggers.map((blogger) => (
              <button key={blogger.id} className="item-button">
                <img src={blogger.image} alt={blogger.name} className="circle-image" />
                <span className="item-name">{blogger.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Restaurants */}
        <div className="row">
          <h3 className="row-title">Popular Restaurants</h3>
          <div className="items-container">
            {restaurants.map((restaurant) => (
              <button key={restaurant.id} className="item-button">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="circle-image"
                />
                <span className="item-name">{restaurant.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
