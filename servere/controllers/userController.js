// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const user = require("../models/userModel");
// require("dotenv").config();
// const registerUser = asyncHandler(async(req , res)=>{
//     const{  firstName, lastName, age, gender, bloodGroup, email,  password, phoneNumber}=req.body;
//     if(!firstName || !lastName || !age ||! gender|| !bloodGroup  || !emial || !password || !phoneNumber){
//         res.status(400);
//         throw new Error("Please fill all fields");
//     }
//     const userExists = await User.findOne({email});
//     if(userExists){
//         return res.status(400).json({meassage : "user already exists"});
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password , salt);
//     const user = await user.create({
//         firstName ,
//         lastName,
//         age,
//         gender,
//         bloodGroup,
//         email,
//         phoneNumber,
//         password:hashedPassword,
//     });
//     res.status(201).json({ message : "user registered succesfully" , user: newUser});
// })
// module.exports = { registerUser}





const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/userModel"); // Corrected variable name to 'User'
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token= jwt.sign(
            {
                 id: user._id,
                 
                 email: user.email},
                 process.env.PRIVATE_KEY,
                 { expiresIn: '1h' }
             
         );
         console.log(token)
        res.status(200).json({
            message: "User logged in successfully" , token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser };
