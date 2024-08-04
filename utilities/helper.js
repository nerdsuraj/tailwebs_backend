const baseModel = require("../model/base.model");
const jwt = require("jsonwebtoken");
const db_query = require("../utilities/db.query");



let checkToken = (req, res, next) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("🚀 ~ checkToken ~ reqBody:", reqBody)
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, "secretkey", async (err, decoded) => {
                let user_email = await db_query.findOne(baseModel.user, { email: decoded.email }, {}, 0);
                if (user_email) {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                status: "failed",
                msg: "Auth Token Not Provided",
            });
        }
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            msg: "Auth Token Not Provided",
            error: error,
        });
    }
};


module.exports = {
    checkToken
};