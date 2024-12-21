import React, { useState } from "react";
import { fetchWeather, getRecipeForWeather, getCity } from "./weatherLogic.js";
import './Weather.css';
// Import all images
import gazpacho from './images/Gazpacho-002s.webp';
import beefStew from './images/heartybeefstew.jpg';
import mediterranean from './images/mediterranean-grilled-chicken-recipe-13.jpg';
import slowCooker from './images/SlowCookerCurryBeefRamen_11.webp';
import springQuinoa from './images/warm-spring-quinoa-salad-9.jpg';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Loading...'); 
    const [recipe, setRecipe] = useState(null);
    const [showContent, setShowContent] = useState(false);

    const recipeImages = {
        "Summer Fresh Gazpacho": gazpacho,
        "Hearty Beef Stew": beefStew,
        "Mediterranean Grilled Chicken": mediterranean,
        "Rainy Day Ramen": slowCooker,
        "Spring Quinoa Salad": springQuinoa
    };

    const handleFetchWeather = async () => {
        try {
            const cityName = await getCity();
            setCity(typeof cityName === 'string' ? cityName : 'Unknown Location');
            
            const weather = await fetchWeather();
            setWeatherData(weather);
            
            if (weather) {
                const suggestedRecipe = getRecipeForWeather(weather);
                setRecipe(suggestedRecipe);
            }
            setShowContent(true); // Show content after fetching data
        } catch (error) {
            console.error("Error fetching data:", error);
            setCity('Unknown Location');
        }
    };

    return (
        <div className="background_weatherpage">
            <div className="weather-container">
                {!showContent ? (
                    <button 
                        className="weather-button"
                        onClick={handleFetchWeather}
                    >
                        SURPRISE ME
                    </button>
                ) : (
                    <>
                        <div className="weather-card">
                            <h2 className="section-title">Current Weather in {city}</h2>
                            <div className="weather-info">
                                <p><span className="weather-label">Temperature:</span> {weatherData?.temperature || '--'}°C</p>
                                <p><span className="weather-label">Description:</span> {weatherData?.description || '--'}</p>
                                <p><span className="weather-label">Humidity:</span> {weatherData?.humidity || '--'}%</p>
                                <p><span className="weather-label">Wind Speed:</span> {weatherData?.windSpeed || '--'} m/s</p>
                            </div>
                        </div>

                        {recipe && (
                            <div className="recipe-card">
                                <h2 className="section-title">Suggested Recipe</h2>
                                {recipeImages[recipe.name] && (
                                    <div className="recipe-image-container">
                                        <img 
                                            src={recipeImages[recipe.name]} 
                                            alt={recipe.name}
                                            className="recipe-image"
                                        />
                                    </div>
                                )}
                                <h3 className="recipe-name">{recipe.name}</h3>
                                <p className="recipe-time">Time: {recipe.time}</p>
                                <p className="recipe-description">{recipe.shortDescription}</p>
                                
                                <div className="tags-container">
                                    {recipe.tags.split(', ').map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>

                                <h4 className="weather-label">Ingredients:</h4>
                                <ul className="ingredients-list">
                                    {recipe.ingredients.map((ing, index) => (
                                        <li key={index} className="ingredient-item">
                                            {ing.ingridient}: {ing.amount}
                                        </li>
                                    ))}
                                </ul>

                                <p className="recipe-category">Category: {recipe.foodCategory}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;