import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/addtocart.css';

export const AddToCart = () => {
  const location = useLocation();
  const { item } = location.state || {};
  
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (item && !savedCart.some(cartItem => cartItem.id === item.id)) {
      const updatedCart = [...savedCart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      setCart(savedCart);
    }
  }, [item]);


  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return <p>No items in the cart.</p>;
  }

  return (
    <div className='add_to_cart_container'>
      <h2>Items in Cart</h2>
      <div className='cart_grid'>
        {cart.map((cartItem, index) => (
          <div key={index} className='cart_item'>
            <img 
              src={cartItem.image} 
              alt="Recipe" 
              style={{ width: '300px', borderRadius: '10px', marginBottom: '20px' }} 
            />
            <p><strong>Name:</strong> {cartItem.name}</p>
            <p><strong>Type:</strong> {cartItem.cuisine}</p>
            <p><strong>Price:</strong> {cartItem.caloriesPerServing}</p>
            <p><strong>Rating:</strong> {cartItem.rating}</p>
            
            <button 
              className='delete_button' 
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


