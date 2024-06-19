import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseDetails, registerForCourse, fetchUserDetails } from '../utils/api'; // Ensure registerForCourse is implemented correctly
import coursePlaceholder from '../assets/img-placeholder-course.png';
import Layout from '../header/Layout';
import Footer from '../footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Course = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [userType, setUserType] = useState(null);
  
    const storedUserData = localStorage.getItem('user');
    const userId = storedUserData ? JSON.parse(storedUserData).userId : null;
  
    useEffect(() => {
      const getCourseDetails = async () => {
        try {
          const courseData = await fetchCourseDetails(courseId);
          setCourse(courseData);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };
  
      const getUserType = async () => {
        if (userId) {
          try {
            const userDetails = await fetchUserDetails(userId);
            console.log(userDetails.userType);
            setUserType(userDetails.data.userType);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        }
      };
  
      getCourseDetails();
      getUserType();
    }, [courseId, userId]);

    const handleRegister = async () => {
        if (userId && userType === 'student') {
          try {
            const response = await registerForCourse({ studentId: userId, courseId });
      
            // Assuming the promise is resolved, this will be executed
            console.log('Register response:', response);
            toast.success(response.message || 'Successfully registered for the course.');
            if(response.status === '400' ){
                toast.success(response.message);
            }
      
          } catch (error) {
            // This will be executed if the promise is rejected
            console.error('Register error:', error);
            toast.error('Failed to register for the course.');
          }
        } else {
          navigate('/login');
        }
      };
      
      
      

  if (!course) return <div>Loading...</div>;

  return (
    <Layout>
        <div className='course-content-wrap'>
      <ToastContainer />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card mb-4">
              <img
                src={course.courseImage || coursePlaceholder}
                className="course-image"
                alt={course.title}
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
              <div className="card-body">
                <h1 className="card-title">{course.title}</h1>
                <p className="card-text"><strong>Duration:</strong> {course.duration} weeks</p>
                <p className="card-text">{course.description}</p>
                <h2>Syllabus</h2>
                <p>{course.syllabus}</p>
                {userType === 'student' && (
                  <button onClick={handleRegister} className="btn btn-success">Register</button>
                )}
                {!userId && (
                  <button onClick={() => navigate('/login')} className="btn btn-primary">Login to Register</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Course;
