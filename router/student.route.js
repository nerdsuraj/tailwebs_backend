const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const helper = require('../utilities/helper');


router.get('/student_list', helper.checkToken , studentController.student_list);
router.post('/student_create',helper.checkToken , studentController.student_create_update);
router.delete('/student_delete/:id',helper.checkToken , studentController.student_delete);

module.exports = router;