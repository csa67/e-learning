import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails, updateCourseDetails, uploadVideo } from '../utils/api'; // Ensure these functions exist and are imported correctly
import coursePlaceholder from '../assets/img-placeholder-course.png';
import Layout from '../header/Layout';
import './ManageCourse.css'; // Ensure you have this CSS file in your project
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const ManageCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCourseDetails = async () => {
      const courseData = await fetchCourseDetails(courseId);
      setCourse(courseData);
      setEditedCourse(courseData); // Initialize editedCourse with fetched course data
    };
    getCourseDetails();
  }, [courseId]);

  const handleInputChange = (e) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEditedCourse({ ...editedCourse, courseImage: e.target.files[0] });
  };

  const [video, setVideo] = useState({ title: '', file: null });

  // ... existing handlers remain the same

  const handleVideoChange = (e) => {
    setVideo({ ...video, file: e.target.files[0] });
  };

  const handleTitleChange = (e) => {
    setVideo({ ...video, title: e.target.value });
  };

  // ...
   const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', editedCourse.title);
    formData.append('description', editedCourse.description);
    formData.append('duration', editedCourse.duration);
    formData.append('syllabus', editedCourse.syllabus);
  
    // Check for the courseImage field instead of image
    if (editedCourse.courseImage instanceof File) {
      formData.append('courseImage', editedCourse.courseImage); // Use 'image' if that's what the backend expects
    }
  
    try {
      await updateCourseDetails(courseId, formData); // Make sure this function accepts FormData
      
      toast.success('Course updated successfully', {
        onClose: async () => {
            // You need to await the fetchCourseDetails call
            const updatedCourseData = await fetchCourseDetails(courseId);
            setCourse(updatedCourseData);
          setEditMode(false);
        }
      });
    } catch (error) {
      toast.error('Failed to update course');
      console.error(error);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video.file);
    formData.append('title', video.title);

    try {
      // Replace '/api/courses/uploadVideo/' with your actual endpoint
      await uploadVideo(courseId, formData);
      toast.success('Video uploaded successfully',{
      onClose: async () => {
        // You need to await the fetchCourseDetails call
        const updatedCourseData = await fetchCourseDetails(courseId);
        setCourse(updatedCourseData);
      }
    });
      
    } catch (error) {
      toast.error('Failed to upload video');
      console.error(error);
    }
  };


  
  if (!course) return <div>Loading...</div>;

  return (
    <Layout>
        <div className='course-content-wrap'>
      <ToastContainer />
      <div className="container py-4">
        {editMode ? (
          // Edit form with Bootstrap 5 classes
          <form onSubmit={handleSubmit} className="edit-course-form">
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editedCourse.title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration (weeks)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={editedCourse.duration}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="syllabus">Syllabus</label>
              <textarea
                id="syllabus"
                name="syllabus"
                value={editedCourse.syllabus}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseImage">Course Image</label>
              <input
                type="file"
                id="courseImage"
                name="courseImage"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        ) : (
          // Course details with Bootstrap 5 classes
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
                  <button onClick={() => setEditMode(true)} className="btn btn-secondary">Edit Course</button>
                </div>
              </div>
            </div>
          </div>
        )}{course && !editMode && (
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
              
              <form onSubmit={handleVideoSubmit} className="mb-3">
              <div className="form-group">
                <label htmlFor="videoTitle">Video Title</label>
                <input
                  type="text"
                  id="videoTitle"
                  name="videoTitle"
                  value={video.title}
                  onChange={handleTitleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoFile">Video File</label>
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  onChange={handleVideoChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">Add New Video</button>
            </form>
            </>
          )}
        </div>
        </div>
      </Layout>
  );
};

export default ManageCourse;