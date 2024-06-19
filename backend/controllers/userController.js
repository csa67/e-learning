const User = require('../models/users');
const bcrypt = require('bcryptjs');
const validator = require('../utils/validator');
exports.addUser = async (req, res) => {
  try {
    // Validate the password
    const password = req.body.password;
    if (!validator.validatePassword(password)) {
      return res.status(400).send('Password doesnot match the requriments, at least one digit,  one special character, one uppercase letter, one lowercase letter, 8 characters');
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('Email already in use.');
    }

    // Create new user
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: password, // Ensure password is hashed in the User model's pre-save hook
      userType: req.body.userType, // 'professor' or 'student'
      ...(req.file && { image: req.file.path })
    });

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log('Attempting login for:', email); // For debugging

      // Query the user by email and select the password field as well
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({ message: 'Incorrect email' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', user.password, password,  passwordMatch); // For debugging

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      console.log('Login successful for:', email);

      // Send the user's ID and full name in the response
      res.status(200.0).json({
        status: 'success',
        data: {
          userId: user._id,
          fullName: user.fullName // Access fullName as a property of the user document
        }
      });

    } catch (error) {
      console.error('Error during login:', error);
      next(error);
    }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Check if a file is included in the request and update the image field
    if (req.file && req.file.location) {
      updateData.image = req.file.location;
    }

    // Perform the update, using only the provided fields

    const user = await User.findByIdAndUpdate(id,  { $set: updateData }, 
      { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.body.email });
  if (!user) return res.status(404).send('User not found');
  res.send('User deleted successfully');
};

module.exports = exports;


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('firstName lastName email image password userType phone');

        res.status(200).send({ users });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Attempting login for:', email); // For debugging

    // Query the user by email and select the password field as well
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch); // For debugging
    console.log(user.password);
    console.log(password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log('Login successful for:', email);

    // Send the user's ID and full name in the response
    res.status(200.0).json({
      status: 'success',
      data: {
        userId: user._id,
        fullName: user.fullName // Access fullName as a property of the user document
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
};

exports.findEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user===null) {
      res.status(200.0).json({
        status: 'success'
      });
    }

    else{
      res.status(401.0).json({
        status: 'failed',
        data: {
          error: 'Email already in use',
        }
      });
    }

  } catch (error) {
    console.error('Error during email validatoin:', error);
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Directly pass the id to findById
    const user = await User.findById(id);
    
    if (!user) {
      // If user is not found, you can send a 404 Not Found status
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    // If user is found, return the user
    res.status(200).json({
      status: 'success',
      data: user
    });

  } catch (error) {
    console.error('Error during user retrieval:', error);
    next(error);
  }
};


exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    // Find the user
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect current password.' });
    }

    // Validate the new password
    if (!validator.validatePassword(newPassword)) {
      return res.status(400).send('New password does not meet the requirements.');
    }

    // Hash the new password
    //const salt = await bcrypt.genSalt(10);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error during password update:', error);
    next(error);
  }
};