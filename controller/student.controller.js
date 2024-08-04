const baseModel = require("../model/base.model");
const db_query = require("../utilities/db.query");
const mongoose = require("mongoose");



const student_cntrl = {};

student_cntrl.student_list = async (req, res) => {
    try {
        let students = await db_query.findByQuery(baseModel.student, {});
        if (students) {
            return res.status(200).json({ message: "all Students fetched successfully", data: students });
        }
    } catch (error) {
        console.log(error);
    }
};

student_cntrl.student_create_update = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        if(reqBody.id){
                let update_student = await db_query.findOneAndUpdateWithQuery(baseModel.student, { _id: new mongoose.Types.ObjectId(reqBody.id)},reqBody);
                if (update_student) {
                    return res.status(200).json({ message: "Student updated successfully" ,data:update_student});
                }
        }else{
            let create_student = await db_query.createOne(baseModel.student, reqBody);
            if (create_student) {
                return res.status(200).json({ message: "Student created successfully" ,data:create_student});
            }
        }
    } catch (error) {
        console.log(error);
    }
};

student_cntrl.student_delete = async (req, res) => {
    try {
        let student_id = req.params.id;
        let delete_student = await db_query.deleteOne(baseModel.student, { _id: new mongoose.Types.ObjectId(student_id) });
        if (delete_student) {
            return res.status(200).json({ message: "Student deleted successfully" });
        }else{
            return res.status(400).json({ message: "Student not found" });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = student_cntrl;