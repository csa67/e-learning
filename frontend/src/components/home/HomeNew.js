import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../utils/api'; // Update the path to your api.js file
import Layout from '../header/Layout';
import coursePlace from '../assets/img-placeholder-course.png';
import './home.css'
import Footer from '../footer/Footer';
import s1 from '../assets/pexels-julia-m-cameron-4144100.jpg';
import s2 from '../assets/pexels-cottonbro-studio-4827576.jpg';
import s3 from '../assets/pexels-vlada-karpovich-4939645.jpg';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const courseData = await fetchCourses();
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    getCourses();
  }, []);

    return (
      <>
      <Layout>
      <div className="home-page">
      {/* Hero Section */}
      <section class="hero bg-secondary text-white text-center py-5">
        <h1>Discover the World of Knowledge</h1>
        <p>Join our community and explore high-quality courses crafted by top-notch educators.</p>
        <a href={`/explore`} class="btn btn-light">Browse Courses</a>
      </section>
      {/* Course Categories */}
      <section className="featured-courses py-5">
        <div className="container">
        <h2 class="text-center mb-5 text-white">Featured Courses</h2>
        <div className="row justify-content-center align-items-stretch">
            {courses.slice(0, 6).map((course) => (
              <div key={course._id} className="col-md-3 mb-4 d-flex">
              <div className="card flex-grow-1 d-flex flex-column">
                <div className="course-img-container">
                  {/* Use a placeholder image if courseImage is empty */}
                  <img src={course.courseImage || coursePlace} className="card-img-top" alt={course.title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  {/* Add your navigation link here */}
                  <a href={`/courses/${course._id}`} className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
      
    <section class="testimonials bg-light py-5">
        <div class="container">
            <h2 class="text-center mb-5">What Our Students Say</h2>
            <div class="row d-flex">
               
                <div class="col-md-4 d-flex">
                    <div class="testimonial-item card p-3 mb-4">
                        <div class="testimonial-img-container text-center mb-3">
                            <img src={ s1 } alt="Student Name 1"/>
                        </div>
                        <p>"This platform has transformed the way I learn. The courses are fantastic and the instructors
                            are the best!"</p>
                        <h5 class="mt-3">James</h5>
                        <small>Object Orintation Programming</small>
                    </div>
                </div>
                
                <div class="col-md-4 d-flex">
                    <div class="testimonial-item card p-3 mb-4">
                        <div class="testimonial-img-container text-center mb-3">
                            <img src={ s2 } alt="Student Name 2"/>
                        </div>
                        <p>"I've never been more satisfied with an online learning experience. Highly recommended!"</p>
                        <h5 class="mt-3">Robert</h5>
                        <small>Spring Boot Java</small>
                    </div>
                </div>
                <div class="col-md-4 d-flex">
                    <div class="testimonial-item card p-3 mb-4 flex-grow-1">
                        <div class="testimonial-img-container text-center mb-3">
                            <img src={ s3 } alt="Student Name 3"/>
                        </div>
                        <p>"The courses here are a game-changer. The content is top-notch and has helped me in my career
                            immensely!"</p>
                        <h5 class="mt-3">Michael</h5>
                        <small>React JS</small>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    </Layout>
    </>
  );
};

export default Home;
