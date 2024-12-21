const BEpath = "http://localhost:4000";

export const fetchWeather = async () => {
    console.log("Fetching weather data...");
    try {
        const response = await fetch(`${BEpath}/feature/weather`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        
        const data = await response.json();
        console.log("Raw data from server:", data); 


        const weatherData = data.weather || data;

        const returnedData = {
            temperature: weatherData.temperature || 0,
            description: weatherData.description || 'No description available',
            humidity: weatherData.humidity || 0,
            windSpeed: weatherData.windSpeed || 0
        };

        console.log("Processed weather data:", returnedData); // Debug log
        return returnedData;

    } catch (error) {
        console.error("Fetch error:", error);
        return {
            temperature: 0,
            description: "Could not get the weather",
            humidity: 0,
            windSpeed: 0
        };
    }
};

export const getCity = async() => {
    try {
        const response = await fetch(`${BEpath}/feature/location`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch city');
        }

        const data = await response.json();
        console.log("City data:", data);
        return data.city || 'Unknown Location';
    } catch (error) {
        console.error("Error fetching city:", error);
        return 'Unknown Location'; // Return a string instead of the error object
    }
}

const weatherBasedRecipes = [
   {
       name: "Summer Fresh Gazpacho",
       time: "20 minutes",
       shortDescription: "A refreshing cold soup perfect for hot days",
       tags: "vegan, soup, mediterranean, seasonal, raw",
       ingredients: [
           { ingridient: "tomato", amount: 4 },
           { ingridient: "cucumber", amount: 1 },
           { ingridient: "bell pepper", amount: 1 },
           { ingridient: "garlic", amount: 2 },
           { ingridient: "olive oil", amount: 0.25 },
           { ingridient: "vinegar", amount: 0.1 }
       ],
       foodCategory: "soup"
   },
   {
       name: "Hearty Beef Stew",
       time: "2 hours",
       shortDescription: "Warming comfort food for cold weather",
       tags: "meat, soup, comfort, main course, dinner",
       ingredients: [
           { ingridient: "beef", amount: 500 },
           { ingridient: "potato", amount: 3 },
           { ingridient: "carrot", amount: 2 },
           { ingridient: "onion", amount: 1 },
           { ingridient: "garlic", amount: 3 }
       ],
       foodCategory: "main course"
   },
   {
       name: "Spring Quinoa Salad",
       time: "30 minutes",
       shortDescription: "Light and nutritious salad for mild weather",
       tags: "vegan, salad, healthy, seasonal, lunch",
       ingredients: [
           { ingridient: "quinoa", amount: 200 },
           { ingridient: "spinach", amount: 100 },
           { ingridient: "cucumber", amount: 1 },
           { ingridient: "tomato", amount: 2 },
           { ingridient: "olive oil", amount: 0.2 }
       ],
       foodCategory: "salad"
   },
   {
       name: "Rainy Day Ramen",
       time: "45 minutes",
       shortDescription: "Comforting noodle soup for wet weather",
       tags: "japanese, soup, noodles, comfort, main course",
       ingredients: [
           { ingridient: "eggs", amount: 2 },
           { ingridient: "mushroom", amount: 100 },
           { ingridient: "soy sauce", amount: 0.15 },
           { ingridient: "ginger", amount: 0.05 },
           { ingridient: "garlic", amount: 2 }
       ],
       foodCategory: "soup"
   },
   {
       name: "Mediterranean Grilled Chicken",
       time: "40 minutes",
       shortDescription: "Light and flavorful dish for warm evenings",
       tags: "mediterranean, grilled, healthy, main course, dinner",
       ingredients: [
           { ingridient: "chicken", amount: 400 },
           { ingridient: "olive oil", amount: 0.2 },
           { ingridient: "garlic", amount: 3 },
           { ingridient: "oregano", amount: 0.1 },
           { ingridient: "lemon", amount: 1 }
       ],
       foodCategory: "main course"
   }
];

export const getRecipeForWeather = (weatherData) => {
    if (weatherData.temperature >= 30) {
        return weatherBasedRecipes[0]; // Hot weather
    } else if (weatherData.temperature <= 10) {
        return weatherBasedRecipes[1]; // Cold weather
    } else if (weatherData.temperature >= 20) {
        return weatherBasedRecipes[4]; // Warm weather
    } else if (weatherData.temperature >= 15) {
        return weatherBasedRecipes[3]; // Mild-warm weather
    } else {
        return weatherBasedRecipes[2]; //Spring Quinoa Salad
    }
 };