const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
});

userschema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
    
})

userschema.methods.getjwttoken=function(){
    return jwt.sign({id:this.id},"thisisthestring",{
        expiresIn:3600
    })
}

module.exports=mongoose.model("User",userschema);