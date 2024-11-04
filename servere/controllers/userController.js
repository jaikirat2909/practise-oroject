const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../model/userModel");
require("dotenv").config();
const registerUser = asyncHandler(async(req , res)=>{
    const{ name , email , password , phoneNumber}=req.body;
    if(!firstName || lastName || gender || age || bloodGroup  || !emial || !password || !phoneNumber){
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({meassage : "user already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);
    const user = await user.create({
        firstName ,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password:hashedPassword,
    });
    res.status(201).json({ message : "user registered succesfully" , user});
})
module.exports = { registerUser}