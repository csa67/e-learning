import React from 'react';
import Header from '../header/header'; // Assuming you have a Header component as previously discussed
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from '../header/Layout';
import './home.css'
import Footer from '../footer/Footer';

// Dummy data for courses and testimonials, replace with your actual data sources
const featuredCourses = [
  { id: 1, title: "Course 1", description: "An introduction to course 1." },
  { id: 2, title: "Course 2", description: "An introduction to course 2." },
  // Add more courses as needed
];

const testimonials = [
  { id: 1, quote: "This platform has changed the way I learn.", author: "Jane Doe" },
  { id: 2, quote: "Thanks to these courses, I've improved my skills significantly!", author: "John Smith" },
  // Add more testimonials as needed
];

const HomePage = () => {
  return (
    <>
    <Layout>
    <div className="home-page">
      <div className="container my-5">
        <section className="text-center my-5">
          <h1>Welcome to NestKnowledge</h1>
          <p>Your journey to learn more starts here. Explore our featured courses below.</p>
        </section>

        <section className="my-5">
          <h2>Featured Courses</h2>
          <div className="row">
            {featuredCourses.map(course => (
              <div key={course.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <a href="#" className="btn btn-primary">Learn More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-5">
          <h2>Testimonials</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <blockquote className="blockquote">
                    <p className="mb-0">{testimonial.quote}</p>
                    <footer className="blockquote-footer">{testimonial.author}</footer>
                  </blockquote>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <Footer />
      </div>
      </div>
      </Layout>
    </>
  );
};

export default HomePage;
