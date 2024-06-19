import React, { useState, useEffect } from 'react';
import coursePlaceholder from '../assets/img-placeholder-course.png';
import Layout from '../header/Layout';
import './ManageCourse.css'; // Ensure you have this CSS file in your project
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseDetails, dropCourse } from '../utils/api'; 

const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const storedUserData = localStorage.getItem('user');
  const userData = JSON.parse(storedUserData);

  useEffect(() => {
    const getCourseDetails = async () => {
      const courseData = await fetchCourseDetails(courseId);
      setCourse(courseData);
    };
    getCourseDetails();
  }, [courseId]);

  const handleDropCourse = async () => {
    if (userData && userData.userId) {
      try {
        const response = await dropCourse({
          studentId: userData.userId,
          courseId: courseId,
        });
        toast.success(response.message);
        navigate('/studentDash');
      } catch (error) {
        console.error('Error dropping the course:', error);
        toast.error('Failed to drop the course');
      }
    } else {
      toast.error('You need to be logged in to drop a course');
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
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} // Inline styles for image size
                />
                <div className="card-body">
                  <h1 className="card-title">{course.title}</h1>
                  <p className="card-text"><strong>Duration:</strong> {course.duration} weeks</p>
                  <p className="card-text">{course.description}</p>
                  <h2>Syllabus</h2>
                  <p>{course.syllabus}</p>
                </div>
              </div>
            </div>
          </div>
            <>
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-3">Course Videos</h3>
                  <div className="row g-4">
                    {course.videos.map((video, index) => (
                      <div key={index} className="col-md-6 col-lg-4">
                        <div className="card h-100">
                          <div className="embed-responsive embed-responsive-16by9">
                            <video className="embed-responsive-item" controls>
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{video.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
            <div className="row mt-4">
          <div className="col">
            <button className="btn btn-success" onClick={handleDropCourse}>Drop</button>
          </div>
        </div>
        </div>
    </div>
      </Layout>
  );
};

export default ViewCourse;