// EditProfile.js
import React, { useContext, useState, useEffect, useRef } from 'react';
import UserContext from '../auth/UserContext';
import defaultProfileImg from '../assets/default-profile.png';
import Edit from '../assets/icon-edit.jpg'
import { fetchUserDetails } from '../utils/api';
import { updateUserDetails } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header';
import Layout from '../header/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/Footer';

const EditProfile = () => {
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState({
      image: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userType: '',
    });
    const fileInputRef = useRef();


  
useEffect(() => {
    const fetchDetails = async () => {
    try {
        
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log('Retrieved user data:', userData);
        const data = await fetchUserDetails(userData.userId);
        if (data.status === 'success') {
            setProfileData({
            image: data.data.image || defaultProfileImg,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            email: data.data.email,
            phone: data.data.phone,
            userType: data.data.userType
            });
        }
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
    };
    
    fetchDetails();
}, [user]);


const handleChange = (e) => {
  const { name, value } = e.target;

  // Name validation: only allows letters and space characters
  if (name === 'firstName' || name === 'lastName') {
    if (/^[A-Za-z ]*$/.test(value)) {
      setProfileData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      // You can use toast to inform the user of invalid input
      toast.error('Names can only contain letters and spaces.');
    }
  }

  // Phone number validation: only allows 10 digits
  if (name === 'phone') {
    if (/^\d{0,10}$/.test(value)) {
      setProfileData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      // You can use toast to inform the user of invalid input
      toast.error('Phone number must be 10 digits.');
    }
  }

  // No validation for other fields
  if (name !== 'firstName' && name !== 'lastName' && name !== 'phone') {
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};

  const handleFileChange = (e) => {
    // Assuming you want to update the profile image preview immediately
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prevState => ({
          ...prevState,
          image: e.target.result // This will be a base64 representation of the image
        }));
      };
      reader.readAsDataURL(file);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const storedUserData = localStorage.getItem('user');
      const userData = JSON.parse(storedUserData);
      const formData = new FormData();
      // Append other profile data fields to the formData
      formData.append('firstName', profileData.firstName);
      formData.append('lastName', profileData.lastName);
      formData.append('phone', profileData.phone);
  
      // Only append the file to formData if a file was selected
      if (fileInputRef.current?.files.length > 0) {
        const file = fileInputRef.current.files[0];
        formData.append('image', file);
      }
      
      // Call the API function with the formData
      const response = await updateUserDetails(userData.userId, formData);
      
      // Log the response or handle the UI update
      console.log('Profile updated', response);
  
      // Display success message
      toast.success('Profile updated successfully!');
      
      // Optionally, navigate to another page or refresh the profile
      // navigate('/profile'); // Uncomment if you have 'navigate' from 'useNavigate()'
  
    } catch (error) {
      // Log the error or display an error message
      console.error('Error updating profile:', error);
  
      // Display error message
      toast.error('Failed to update profile. Please try again.');
  
      // Set an error state here if you have an error handling state in your component
      // setError('Failed to update profile. Please try again.');
    }
  };
  

  const profileImageStyle = {
    width: '150px', // Size of the image
    height: '150px', // Size of the image
    borderRadius: '50%', // Makes the image circular
    objectFit: 'cover', // Ensures the image covers the area
    margin: 'auto', // Centers the image horizontally
    display: 'block' // Necessary for margin: auto to work
  };

  const formElementStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers form elements horizontally
    width: '100%' // Ensures form elements take full width of their container
  };

  const inputStyle = {
    textAlign: 'center', // Centers text inside the inputs
    margin: '10px auto', // Centers the inputs in the form
    width: 'calc(100% - 20px)', // Full width minus margin
    backgroundColor: '#f0f8ff', // Very light blue background color
    border: '1px solid #ced4da', // Optional: to match Bootstrap's default styling
    borderRadius: '0.25rem', // Optional: to match Bootstrap's default styling
    padding: '0.375rem 0.75rem', // Optional: to match Bootstrap's default padding
  };
  

  const labelStyle = {
    width: '100%', // Match the input width
    textAlign: 'center', // Center the text
    marginBottom: '5px' // Space between the label and the input
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const imageContainerStyle = {
    position: 'relative', // This is necessary for absolute positioning of the children
    display: 'inline-block', // This will wrap the container tightly around the content
    margin: 'auto'
  };

  const editIconStyle = {
    position: 'absolute',
    bottom: '10px', // Adjust as needed to move the icon up from the bottom edge of the image
    right: '10px', // Adjust as needed to move the icon in from the right edge of the image
    cursor: 'pointer',
    width: '30px', // Scale down the icon size as needed
    height: '30px', // Scale down the icon size as needed
  };

  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <Layout>
    <div className="home-page">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              Edit Profile
            </div>
            <div className="card-body" style={formElementStyle}>
              <form onSubmit={handleSubmit} style={formElementStyle}>
              <div className="mb-3 text-center" style={imageContainerStyle}>
                  <img
                    src={profileData.image || defaultProfileImg}
                    alt="Profile"
                    style={profileImageStyle}
                    className="img-thumbnail"
                  />
                  <img
                    src={Edit} // Make sure this is the correct path to your edit icon
                    alt="Edit"
                    style={editIconStyle}
                    onClick={triggerFileInput}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
                {/* Other form elements styled with formElementStyle for consistency */}
                <div className="mb-3" style={formElementStyle}>
                  <label htmlFor="firstName" style={labelStyle}>First Name</label>
                  <input type="text" className="form-control" id="firstName" name="firstName" style={inputStyle} value={profileData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3" style={formElementStyle}>
                  <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" style={inputStyle} value={profileData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3" style={formElementStyle}>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input type="email" className="form-control" id="email" name="email" style={inputStyle} value={profileData.email} onChange={handleChange} required disabled />
                </div>
                <div className="mb-3" style={formElementStyle}>
                  <label htmlFor="phone" style={labelStyle}>Phone</label>
                  <input
                    type="text" // Use "text" instead of "tel" to prevent default browser validation
                    className="form-control"
                    id="phone"
                    name="phone"
                    pattern="\d*" // This ensures the mobile keyboard is numeric
                    value={profileData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    maxLength="10" // This prevents the user from entering more than 10 digits
                    required
                  />
                </div>
                <div style={formElementStyle}>
                  <button type="submit" className="btn btn-primary" style={{ margin: '10px auto', width: '150px' }}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    </Layout>
    </>
  );
};

export default EditProfile;
