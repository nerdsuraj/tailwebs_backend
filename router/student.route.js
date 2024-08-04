const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const helper = require('../utilities/helper');


router.get('/student_list', studentController.student_list);
router.post('/student_create', studentController.student_create_update);
router.delete('/student_delete/:id', studentController.student_delete);

module.exports = router;