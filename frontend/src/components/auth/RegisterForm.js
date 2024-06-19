import React, { useState } from 'react';
import { checkEmail, register } from '../utils/api';
import styles from './RegisterForm.module.css'; // Make sure this path is correct
import { useNavigate  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVerificationStage, setIsVerificationStage] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [actualVerificationCode, setActualVerificationCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    let newErrors = {};
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (/[^a-zA-Z ]/.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters and spaces.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (/[^a-zA-Z ]/.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters and spaces.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    // User type validation
    if (!formData.userType) {
      newErrors.userType = 'Please select a user type.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await register(formData, file);
      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 5000, // you can change the time for how long it shows here
        onClose: () => navigate('/login'), // Redirect when the toast is closed
      });
    } catch (error) {
      console.error('Registration error', error.response.data);
      toast.error('Registration failed. Please try again.');
    }
  };

  const navigate = useNavigate();
  

  const inputFields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'phone', type: 'tel', placeholder: 'Phone Number' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' }
  ];

  return (
    <>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerModal">
        Register
      </button>

      <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Sign Up</h5>
            </div>
            <div className="modal-body">
            <ToastContainer />
                <form onSubmit={handleSubmit} noValidate className="p-4">
                  {inputFields.map(field => (
                    <div key={field.name} className={styles.field}>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder=" " // Space for CSS label animation
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor={field.name}>{field.placeholder}</label>
                      {errors[field.name] && <div className={styles.invalidFeedback}>{errors[field.name]}</div>}
                    </div>
                  ))}

                  <div className={styles.field}>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select User Type</option>
                      <option value="student">Student</option>
                      <option value="professor">Professor</option>
                    </select>
                    <label htmlFor="userType">User Type</label>
                    {errors.userType && <div className={styles.invalidFeedback}>{errors.userType}</div>}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
