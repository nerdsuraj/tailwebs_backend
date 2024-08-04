const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    marks: { type: String, required: true }
},
{
    versionKey: false,
    strict: false
})

const students = mongoose.model('students', studentSchema)

module.exports = students;