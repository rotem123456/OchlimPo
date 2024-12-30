import React, { useState } from "react";
import "./UploadRecipesPage.css";

const tags = [
    "Vegi",
    "Meat",
    "Cocktails",
    "Lunch",
    "Gluten Free",
    "Kosher",
];

const units = ["kg", "grams", "units", "cups", "ml", "liter"];

const RecipeUpload = () => {
    const [recipeName, setRecipeName] = useState("Recipe Name");
    const [isEditingName, setIsEditingName] = useState(false);
    const [prepTime, setPrepTime] = useState(0);
    const [difficulty, setDifficulty] = useState("Easy");
    const [ingredients, setIngredients] = useState([{ name: "", amount: 0, unit: "units" }]);
    const [steps, setSteps] = useState([""]);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const BEpath = "http://localhost:4000";

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages([...images, ...newImages]);
        if (!selectedImage && newImages.length > 0) setSelectedImage(newImages[0].preview);
    };

    const handleImageSelect = (preview) => {
        setSelectedImage(preview);
    };

    const handleImageRemove = () => {
        const updatedImages = images.filter((img) => img.preview !== selectedImage);
        setImages(updatedImages);
        setSelectedImage(updatedImages.length > 0 ? updatedImages[0].preview : null);
    };

    const handleNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handleNameBlur = () => {
        setIsEditingName(false);
    };

    const addIngredient = () =>
        setIngredients([...ingredients, { name: "", amount: 0, unit: "units" }]);

    const addStep = () => setSteps([...steps, ""]);

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setIngredients(updatedIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("recipe"); // Debugging message
    };



    return (
        <div className="background">
            <div className="container">
                {/* גלריה בצד שמאל */}
                <div className="gallery-section">
                    <h2>Photos & Videos</h2>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="upload-input"
                    />
                    <label htmlFor="upload-input" className="upload-button">
                        Upload Images
                    </label>

                    {selectedImage ? (
                        <div className="selected-image-container">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="selected-image"
                            />
                            <button
                                className="remove-image-button"
                                onClick={handleImageRemove}
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <div className="empty-image-preview">
                            <p>No Image</p>
                        </div>
                    )}

                    <div className="image-gallery">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.preview}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail ${
                                    img.preview === selectedImage ? "active-thumbnail" : ""
                                }`}
                                onClick={() => handleImageSelect(img.preview)}
                            />
                        ))}
                    </div>
                </div>

                {/* פרטים בצד ימין */}
                <div className="form-section">
                    <form className="recipe-form" onSubmit={handleSubmit}>
                        <div
                            className="recipe-name"
                            onClick={() => setIsEditingName(true)}
                        >
                            {isEditingName ? (
                                <input
                                    type="text"
                                    value={recipeName}
                                    onChange={handleNameChange}
                                    onBlur={handleNameBlur}
                                    autoFocus
                                    placeholder="Recipe Name"
                                    className="editable-recipe-name"
                                />
                            ) : (
                                <h1 className={recipeName ? "" : "placeholder"}>
                                    {recipeName || "Recipe Name"}
                                </h1>
                            )}
                        </div>

                        <div className="time-difficulty-container">
                            <div className="form-group">
                                <label>Preparation Time</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="120"
                                    value={prepTime}
                                    onChange={(e) => setPrepTime(e.target.value)}
                                />
                                <p>{prepTime} minutes</p>
                            </div>

                            <div className="form-group">
                                <label>Difficulty</label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        <h2>Ingredients</h2>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-group">
                                <input
                                    type="text"
                                    placeholder="Ingredient name"
                                    value={ingredient.name}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "name", e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    value={ingredient.amount}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "amount", e.target.value)
                                    }
                                />
                                <select
                                    value={ingredient.unit}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "unit", e.target.value)
                                    }
                                >
                                    {units.map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIngredients(
                                            ingredients.filter((_, i) => i !== index)
                                        )
                                    }
                                    className="remove-row-button"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="add-button">
                            +
                        </button>

                        <h2>Preparation Steps</h2>
                        {steps.map((step, index) => (
                            <div key={index} className="step-group">
                                <textarea
                                    placeholder={`Step ${index + 1}`}
                                    value={step}
                                    onChange={(e) =>
                                        setSteps(
                                            steps.map((stp, i) =>
                                                i === index ? e.target.value : stp
                                            )
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSteps(steps.filter((_, i) => i !== index))
                                    }
                                    className="remove-row-button"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addStep} className="add-button">
                            +
                        </button>

                        <h2>Tags</h2>
                        <div className="tags-container">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    className={`tag ${
                                        selectedTags.includes(tag) ? "active" : ""
                                    }`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <button type="submit" className="submit-button">
                            Submit Recipe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecipeUpload;
