import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css';
import recipe from '../assets/recipe1.jpg';

export const Navbar = () => {
  const [loged, setLoged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoged(!!token); 
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setLoged(false);
    alert('LogOut Successful');
    navigate('/'); 
  }

  return (
    <>
      <nav>
        <img src={recipe} alt="Recipe Logo" style={{ borderRadius: '50%' }} />

        <div>
          <Link to="/">Home</Link>

         
          {loged && (
            <>
              <Link to="/add-to-cart/:id">Cart</Link>
           
            </>
          )}

          {loged ? (
            <>
              <Link to="/" onClick={handleLogout} className="Login">
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="Login">Login</Link>
              <Link to="/signup" className="Signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};


