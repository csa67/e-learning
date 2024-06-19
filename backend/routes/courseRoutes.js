const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();
const upload = require('./multerConfig');

// Middleware to check if the user is a professor might be added here

router.post('/create', courseController.createCourse);
router.put('/update/:id', upload.single('courseImage'), courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);
router.post('/uploadVideo/:courseId', upload.single('video'), courseController.uploadVideo);
router.get('/', courseController.viewAllCourses);
router.post('/register', courseController.registerStudentForCourse);
router.post('/drop', courseController.dropCourse);
router.get('/professor/:professorId', courseController.getCoursesByProfessor);
router.get('/:courseId', courseController.getCourseDetails);
router.get('/:courseId/videos', courseController.getCourseVideos);
router.get('/student/:studentId', courseController.getCoursesByStudent);

module.exports = router;
