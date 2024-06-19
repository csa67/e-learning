const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  syllabus: {
    type: String, // This could also be an array or a file path
  },
  courseImage: {
    type: String, // URL of the image
    default: '' // Optional: Set a default image URL if desired
  },
  videos: [{
    title: {
      type: String,
    },
    url: {
      type: String,
    }
  }],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
