let baseModel = require('../model/base.model'); 
let db_query = require('../utilities/db.query');

const userCntrl = {};

userCntrl.register = async(req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("🚀 ~ userCntrl.register=async ~ reqBody:", reqBody)
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

module.exports = userCntrl;