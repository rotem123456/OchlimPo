
export const userTypes:string[]  = ["Viewer","Blogger","Admin"]

export type FoodTag = {
    id: string;
    label: string;
    category: 'dietary' | 'taste' | 'cuisine' | 'ingredient' | 'preparation' | 'course';
  };
  

  export const foodTags: FoodTag[] = [
    { id: 'vegetarian', label: 'Vegetarian', category: 'dietary' },
    { id: 'vegan', label: 'Vegan', category: 'dietary' },
    { id: 'gluten-free', label: 'Gluten Free', category: 'dietary' },
    { id: 'dairy-free', label: 'Dairy Free', category: 'dietary' },
    { id: 'keto', label: 'Keto', category: 'dietary' },
    { id: 'paleo', label: 'Paleo', category: 'dietary' },
    { id: 'halal', label: 'Halal', category: 'dietary' },
    { id: 'kosher', label: 'Kosher', category: 'dietary' },
    { id: 'low-carb', label: 'Low Carb', category: 'dietary' },
  
    // Taste
    { id: 'spicy', label: 'Spicy', category: 'taste' },
    { id: 'sweet', label: 'Sweet', category: 'taste' },
    { id: 'sour', label: 'Sour', category: 'taste' },
    { id: 'savory', label: 'Savory', category: 'taste' },
    { id: 'bitter', label: 'Bitter', category: 'taste' },
    { id: 'umami', label: 'Umami', category: 'taste' },
  
    // Cuisine
    { id: 'italian', label: 'Italian', category: 'cuisine' },
    { id: 'chinese', label: 'Chinese', category: 'cuisine' },
    { id: 'japanese', label: 'Japanese', category: 'cuisine' },
    { id: 'mexican', label: 'Mexican', category: 'cuisine' },
    { id: 'indian', label: 'Indian', category: 'cuisine' },
    { id: 'thai', label: 'Thai', category: 'cuisine' },
    { id: 'mediterranean', label: 'Mediterranean', category: 'cuisine' },
    { id: 'french', label: 'French', category: 'cuisine' },
    { id: 'korean', label: 'Korean', category: 'cuisine' },
    { id: 'vietnamese', label: 'Vietnamese', category: 'cuisine' },
  
    // Ingredient
    { id: 'meat', label: 'Meat', category: 'ingredient' },
    { id: 'seafood', label: 'Seafood', category: 'ingredient' },
    { id: 'chicken', label: 'Chicken', category: 'ingredient' },
    { id: 'beef', label: 'Beef', category: 'ingredient' },
    { id: 'pork', label: 'Pork', category: 'ingredient' },
    { id: 'tofu', label: 'Tofu', category: 'ingredient' },
    { id: 'eggs', label: 'Eggs', category: 'ingredient' },
    { id: 'nuts', label: 'Nuts', category: 'ingredient' },
    { id: 'mushrooms', label: 'Mushrooms', category: 'ingredient' },
    { id: 'rice', label: 'Rice', category: 'ingredient' },
  
    // Preparation
    { id: 'grilled', label: 'Grilled', category: 'preparation' },
    { id: 'fried', label: 'Fried', category: 'preparation' },
    { id: 'baked', label: 'Baked', category: 'preparation' },
    { id: 'steamed', label: 'Steamed', category: 'preparation' },
    { id: 'raw', label: 'Raw', category: 'preparation' },
    { id: 'smoked', label: 'Smoked', category: 'preparation' },
    { id: 'roasted', label: 'Roasted', category: 'preparation' },
    { id: 'stir-fried', label: 'Stir Fried', category: 'preparation' },
  
    // Course
    { id: 'appetizer', label: 'Appetizer', category: 'course' },
    { id: 'main', label: 'Main Course', category: 'course' },
    { id: 'dessert', label: 'Dessert', category: 'course' },
    { id: 'breakfast', label: 'Breakfast', category: 'course' },
    { id: 'lunch', label: 'Lunch', category: 'course' },
    { id: 'dinner', label: 'Dinner', category: 'course' },
    { id: 'snack', label: 'Snack', category: 'course' },
    { id: 'soup', label: 'Soup', category: 'course' },
    { id: 'salad', label: 'Salad', category: 'course' },
    { id: 'side-dish', label: 'Side Dish', category: 'course' }
  ];
  
  export default foodTags;