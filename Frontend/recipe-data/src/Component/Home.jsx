import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

export const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  async function FetchData() {
    try {
      let res = await fetch("https://dummyjson.com/recipes");
      let data = await res.json();
      const newData = data.recipes;
      setRecipe(newData);
      setFilteredRecipes(newData);
    } catch (error) {
      console.log("get error:", error);
    }
  }

  useEffect(() => {
    if (search) {
      const filtered = recipe.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipe);
    }
  }, [search, recipe]);

  useEffect(() => {
    FetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDelete = (id) => {
    const updatedRecipes = recipe.filter((item) => item.id !== id);
    setRecipe(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
  };

  const handleAddToCart = (item) => {
    navigate(`/add-to-cart/${item.id}`, { state: { item } });
  };

  return (
    <>
      <div className='full_container'>
        <input
          placeholder='Search Product Here...'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          className='search_recipes'
        />

        <div className='container_recips'>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((item) => (
              <div
                key={item.id}
                className='recipe_card'
                onClick={() => handleCardClick(item.id)}
              >
                <img src={item.image} alt='No image' className='recips_image' />
                <p>Name: {item.name}</p>
                <p>Type: {item.cuisine}</p>
                <p>Price: {item.caloriesPerServing}</p>
                <p>Rating: {item.rating}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className='delete_button'
                >
                  Delete
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                  className='add_to_cart_button'
                >
                  Add to Cart
                </button>

              </div>
            ))
          ) : (
            <p>Loading Data...</p>
          )}
        </div>
      </div>
    </>
  );
};
