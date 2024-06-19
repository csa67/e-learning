import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from '../utils/api'; // Update this path to the correct location of your api.js
import Layout from '../header/Layout';
import './Password.css'
import Footer from '../footer/Footer';

const PasswordReset = () => { // Assuming you pass the userId as a prop
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const storedUserData = localStorage.getItem('user');
    const userData = JSON.parse(storedUserData);
    
    const userId =  userData.userId;
  const handleInputChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    try {
      const response = await updatePassword(userId, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });

      // Display success message
      toast.success('Password updated successfully');
    } catch (error) {
      // Handle error response from API
      const errorMessage = error.response?.data?.message || 'Failed to update password. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
    <Layout>
    <div className="page-container">
    <div className="content-wrap">
    <ToastContainer />
    <div className="password-reset-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
      </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default PasswordReset;
