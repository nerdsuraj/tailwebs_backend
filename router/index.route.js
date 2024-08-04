const express = require('express');
const router = express.Router();

let userroute = require('./user.route');
router.use('/user', userroute);

module.exports = router;