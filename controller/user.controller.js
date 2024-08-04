let baseModel = require('../model/base.model'); 
let db_query = require('../utilities/db.query');
const jwt = require("jsonwebtoken");

const userCntrl = {};

userCntrl.register = async(req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        if(!reqBody.username && !reqBody.email && !reqBody.password){
            return res.status(400).json({message: "Please provide all the required fields, username, email and password"});
        }
        if(!reqBody.username){
            return res.status(400).json({message: "Please provide username"});
        }
        if(!reqBody.email){
            return res.status(400).json({message: "Please provide email"});
        }
        if(!reqBody.password){
            return res.status(400).json({message: "Please provide password"});
        }

        let user = await db_query.createOne(baseModel.user, reqBody);
        if(user){
            return res.status(200).json({message: "User registered successfully"});
        }
        
    } catch (error) {
        console.log(error);
    }
}

userCntrl.login = async(req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        if(!reqBody.username && !reqBody.password){
            return res.status(400).json({message: "Please provide email and password"});
        }
        if(!reqBody.username){
            return res.status(400).json({message: "Please provide email"});
        }
        if(!reqBody.password){
            return res.status(400).json({message: "Please provide password"});
        }

        let user = await db_query.findOne(baseModel.user, {username: reqBody.username});
        console.log("🚀 ~ userCntrl.login=async ~ user:", user)
        if(user){
            if(user.password === reqBody.password){
                let apiKey = jwt.sign({ username: user.username,email:user.email }, "secretkey");
                return res.status(200).json({message: "User logged in successfully", apiKey: apiKey});
            }else{
                return res.status(400).json({message: "Invalid credentials"});
            }
        }else{
            return res.status(400).json({message: "User not found"});
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = userCntrl;