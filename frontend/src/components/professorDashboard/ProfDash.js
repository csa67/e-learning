import React, { useState, useEffect } from 'react';
import { fetchUserDetails, viewAllCourses } from '../utils/api'; // Update paths to your API functions
import Layout from '../header/Layout'; // Your layout wrapper
import coursePlace from '../assets/img-placeholder-course.png';
import './ProfessorDashboard.css'; // Path to your CSS for styling
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';


const ProfessorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [lastname, setLast] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const handleCardClick = (courseId) => {
    navigate(`/manageCourses/${courseId}`);
  };
  
  const handleCreate = () =>{
    navigate(`/createCourse/${userId}`);
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log('Retrieved user data:', userData);
            setUserId(userData.userId);
          const userDetails = await fetchUserDetails(userData.userId);
            setLast(userDetails.data.lastName)
            // Now fetch the courses using the professor's ID
            const fetchedCourses = await viewAllCourses(userData.userId);
            setCourses(fetchedCourses);
        }
        }catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <Layout>
      <div className="container my-4">
        <div className="professor-details">
          <h1>Hi, Prof. {lastname}</h1>
        </div>
        <h2 className="mt-4">My Courses</h2>
        <section className="course-list py-5">
        <div className="container">
          <div className="row justify-content-center align-items-stretch">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course._id} className="col-md-4 mb-4 d-flex">
                  <div className="card flex-grow-1" onClick={() => handleCardClick(course._id)}>
                    <div className="course-img-container">
                      <img src={course.courseImage || coursePlace} className="card-img-top" alt={course.title} />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses to display.</p>
            )}
          </div>
        </div>
      </section>
        <div className="row mt-4">
          <div className="col">
            <button className="btn btn-success" onClick={handleCreate}>Add New Course</button>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default ProfessorDashboard;
