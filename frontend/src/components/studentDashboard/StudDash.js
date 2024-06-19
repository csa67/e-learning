import React, { useState, useEffect } from 'react';
import { fetchUserDetails, fetchStudentDetails } from '../utils/api'; // Ensure you have these functions
import Layout from '../header/Layout';
import coursePlace from '../assets/img-placeholder-course.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import '../professorDashboard/ProfessorDashboard.css'
const StudentDashboard = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState('');

  const navigate = useNavigate();
  const handleCardClick = (courseId) => {
    navigate(`/viewCourses/${courseId}`);
};

    const handleNewRegistration= (courseId) => {
        navigate('/explore');
    };

    const storedUserData = localStorage.getItem('user');
    const userData = JSON.parse(storedUserData);

  useEffect(() => {
    const loadStudentDetails = async () => {
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log('Retrieved user data:', userData);

          const userDetails = await fetchUserDetails(userData.userId);
          setStudentName(userDetails.data.lastName)
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle the error appropriately
      }
    };

    const loadCourses = async () => {
      try {
        const response = await fetchStudentDetails(userData.userId);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle the error appropriately
      }
    };

    loadStudentDetails();
    loadCourses();
  }, [userId]);

  return (
    <Layout>
      <div className="content container my-4">
        <h1>Hi, {studentName}</h1>
        <h2>Enrolled Courses</h2>
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
            <button className="btn btn-success" onClick={handleNewRegistration}>Enroll New Course</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
