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
    FetchData();
  }, []);

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

  const handleViewDetails = (item) => {
    navigate(`/recipe-details/${item.id}`, { state: { recipe: item } });
  };

  const handleAddToCart = (item) => {
    navigate(`/add-to-cart/${item.id}`, { state: { item } });
  };

  return (
    <div className='full_container'>
      <input
        placeholder='Search Recipe Here...'
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        className='search_recipes'
      />

      <div className='container_recips'>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item) => (
            <div key={item.id} className='recipe_card'>
              <img src={item.image} alt='No image' className='recips_image' />
              <p>Name: {item.name}</p>
              <p>Type: {item.cuisine}</p>
              <p>Price: {item.caloriesPerServing}</p>
              <p>Rating: {item.rating}</p>

              <div className='card_buttons'>
                <button
                  onClick={() => handleViewDetails(item)}
                  className='view_details_button'
                >
                  View Details
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className='add_to_cart_button'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Data...</p>
        )}
      </div>
    </div>
  );
};
