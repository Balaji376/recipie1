import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../style/recipeView.css'

export const RecipeView = () => {
  const { id } = useParams("6b65aa0940284e7d8ef9f583fff2225c");
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);

  useEffect(() => {
    if (!recipe) {
      async function fetchRecipe() {
        try {
          let res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6b65aa0940284e7d8ef9f583fff2225c`);
          let data = await res.json();
          setRecipe(data);
        } catch (error) {
          console.log("Error fetching recipe details:", error);
        }
      }
      fetchRecipe();
    }
  }, [id, recipe]);

  if (!recipe) {
    return <p>Loading Recipe...</p>;
  }

  return (
    <div className='recipe_view_container'>
      <h1 id='recipe_title'>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className='recipe_view_image' />
      <div className='recipe_view_info'>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
        <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
        <p><strong>Calories Per Serving:</strong> {recipe.caloriesPerServing}</p>
        <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
      </div>
      <h2>Ingredients</h2>
      <ul className='recipe_view_ingredients'>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol className='recipe_view_instructions'>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
