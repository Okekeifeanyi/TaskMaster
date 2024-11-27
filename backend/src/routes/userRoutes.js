const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

module.exports = router;
