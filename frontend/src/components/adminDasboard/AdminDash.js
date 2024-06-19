// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../utils/api'; // Replace with your actual API call
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../header/Layout';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const viewUserDetails = (userId) => {
    // Navigate to the user detail page, which should have a route set up to handle the userId param
    navigate(`/user-details/${userId}`);
  };

  return (
    <>
    <Layout>
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} onClick={() => viewUserDetails(user._id)} style={{ cursor: 'pointer' }}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
    </>
  );
};

export default AdminDashboard;
