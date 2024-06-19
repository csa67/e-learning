// CreateCourse.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCourse } from '../utils/api'; // Ensure createCourse is implemented to make a POST request to your API
import Layout from '../header/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    syllabus: '',
  });
  const [courseImage, setCourseImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleImageChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(courseData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('professor', userId)
    if (courseImage) {
      formData.append('courseImage', courseImage);
    }
    try {
      await createCourse(formData);
      toast.success('Course created successfully!');
      navigate('/professorDash'); // Redirect to the courses page or dashboard
    } catch (error) {
      toast.error('Failed to create course');
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
      <ToastContainer />
        <h1>Create a New Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Course Title</label>
            <input type="text" className="form-control" id="title" name="title" value={courseData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Course Description</label>
            <textarea className="form-control" id="description" name="description" value={courseData.description} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Course Duration (weeks)</label>
            <input type="number" className="form-control" id="duration" name="duration" value={courseData.duration} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="syllabus" className="form-label">Syllabus</label>
            <textarea className="form-control" id="syllabus" name="syllabus" value={courseData.syllabus} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="courseImage" className="form-label">Course Image</label>
            <input type="file" className="form-control" id="courseImage" name="courseImage" onChange={handleImageChange} />
          </div>
          <button type="submit" className="btn btn-primary">Create Course</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
