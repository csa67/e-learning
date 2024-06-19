// server.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const courseRoutes = require('./routes/courseRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// User Routes
app.use('/user', userRoutes);
app.use('/api/courses', courseRoutes);
// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
