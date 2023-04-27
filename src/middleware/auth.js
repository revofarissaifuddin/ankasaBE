const jwt = require("jsonwebtoken");
let key = process.env.JWT_KEY;

const protect = (req,res,next) => {
    try{
        let token;
        if(req.headers.authorization){
            let auth = req.headers.authorization;
            // console.log(auth)
            token = auth.split(" ")[1];
            // console.log(token)
            let decode = jwt.verify(token,key);
            req.payload = decode;
            // console.log(decode)
            next();
        } else{
            return res.status(404). json({status:404,message:"login failed, server need token"});       
        }
    }catch(error){
        console.log("error",error);
        if(error && error.name == "JsonWebTokenError"){
            return res.status(404). json({status:404,message:"login failed, invalid token"});       
        } else if(error && error.name == "TokenExpiredError"){
            return res.status(404). json({status:404,message:"login failed, token expired"});       
        } else{
            return res.status(404). json({status:404,message:"login failed, pelase login"});       
        }
    }
};

module.exports = {protect}; 