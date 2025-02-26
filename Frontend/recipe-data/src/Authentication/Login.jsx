
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

  try {
    const response = await axios.post('https://recepie-server.onrender.com/auth/login',{
      email,
      password
    })
      localStorage.setItem('token', response.data.token)

    alert('login successfully')
    setEmail('')
    setPassword('')
    await navigate('/')
    window.location.reload();

  } catch (error) {
    alert('something wrong')
  }

  }

  return (
    <div className='login_body'>
    <div className='container_login'>

      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form '>

          <input
          placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='INput_My'
          />
       
       

          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='INput_My'
          />
      
      
        <button type="submit">Login</button>

      </form>
    </div>
    </div>
  );
};

export default Login;


