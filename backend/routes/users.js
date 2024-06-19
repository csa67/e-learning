const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('./multerConfig');


router.post('/register', upload.single('image'), userController.addUser);
router.post('/login', userController.loginUser);
router.put('/update/:id', upload.single('image'), userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
router.post('/findEmail', userController.findEmail);
router.post('/findById/:id', userController.findById);
router.put('/updatePassword/:id', userController.updatePassword);

module.exports = router;



