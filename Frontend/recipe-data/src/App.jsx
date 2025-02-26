import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar/navbar';
import Login from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { Home } from './Component/Home';
import { AddToCart } from './Component/AddtoCart';
import { RecipeView } from './Component/recipeDetails';






function App() {
  const token = localStorage.getItem('token'); 

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      
        <Route 
          path="/add-to-cart/:id" 
          element={token ? <AddToCart /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/recipe-details/:id" 
          element={token ? <RecipeView /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;



