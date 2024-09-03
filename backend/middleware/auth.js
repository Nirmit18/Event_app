const jwt=require("jsonwebtoken");
const User = require("../Schema/user_schema");
const {signup, singin, myevents, updateEvent, getallevents}= require("../controller/authcontroller");

exports.isAuthenticated = async(req,res,next)=>{
    const {token}=req.cookies['jwt-cookie'];
    console.log(token);
    if(!token){
        return res.json({
            message:"error"
        })
        
    }
    try{
        const decoded=jwt.verify(token,"thisisthestring");
        req.user=await User.findById(decoded.id);
        next();
    }catch(error){
        return res.json({
            message:"error h"
        })
    }
}



