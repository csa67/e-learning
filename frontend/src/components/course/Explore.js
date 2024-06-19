import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../utils/api'; // Update the path to your api.js file
import Layout from '../header/Layout';
import coursePlace from '../assets/img-placeholder-course.png';
import Footer from '../footer/Footer';

const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Layout>
        <div className="explore-page">
          <section className="search-section py-5">
            <div className="container">
              <input
                type="text"
                className="form-control"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </section>

          <section className="course-list py-5">
            <div className="container">
              <div className="row justify-content-center align-items-stretch">
                {filteredCourses.map(course => (
                  <div key={course._id} className="col-md-4 mb-4 d-flex">
                    <div className="card flex-grow-1">
                      <div className="course-img-container">
                        <img src={course.courseImage || coursePlace} className="card-img-top" alt={course.title} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">{course.description}</p>
                        <a href={`/courses/${course._id}`} className="btn btn-primary">Learn More</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Explore;
