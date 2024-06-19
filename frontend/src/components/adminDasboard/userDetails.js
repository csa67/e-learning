import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../utils/api';
import defaultProfileImg from '../assets/default-profile.png'; // Path to a default profile image
import Layout from '../header/Layout';
import Footer from '../footer/Footer';

const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchUserDetails(userId);
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchDetails();
  }, [userId]);

  if (!userDetails) return <div>Loading...</div>;

  return (
    <>
    <Layout>
    <div className="container mt-4">
      <h2>User Details</h2>
      <div className="card" style={{ width: '18rem' }}>
        <img src={userDetails.data.image || defaultProfileImg} className="card-img-top" alt={`${userDetails.firstName} ${userDetails.lastName}`} />
        <div className="card-body">
          <h5 className="card-title">{`${userDetails.data.firstName} ${userDetails.data.lastName}`}</h5>
          <p className="card-text">{userDetails.data.email}</p>
          <p className="card-text">{userDetails.data.phone}</p>
          <p className="badge bg-primary">{userDetails.data.userType}</p>
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default UserDetails;
