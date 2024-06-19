import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import Header from '../header/header';
import UserContext from './UserContext';
import LoginImg from '../assets/6205275.jpg'
import Layout from '../header/Layout';
import './Login.css'
import Footer from '../footer/Footer';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log('Login successful', response.data);
      const userData = response.data.data;
      setUser(userData); // Set user in context
      localStorage.setItem('user', JSON.stringify(response.data.data));
      console.log('User saved to localStorage', response.data.data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='login-page'>
      <Layout >
      <div className="row h-100">
        <div className="col-lg-6 p-0">
          <img src= {LoginImg} alt="Login" className="img-fluid h-100" />
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="w-75" id="loginForm">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
      <Footer />
      </Layout>
    </div>
  );
};

export default LoginForm;
