const express = require('express');
const router = express.Router();

let userroute = require('./user.route');
router.use('/user', userroute);

let studentroute = require('./student.route');
router.use('/student', studentroute);

module.exports = router;