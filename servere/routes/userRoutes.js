const express = require("express");
const router = express.Router();
const  User= require("../models/userModel") ;

const myAccount=async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user){
        res.send(user);
    }
}
// const{validateToken,generateToken}=require("../middlewares/jwtmiddleware")
const {
    registerUser,
    loginUser
}=require("../controllers/userController");
const {validateJwtToken }=require("../middlewares/jwtmiddleware");
//route for user registration 
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/details",myAccount,validateJwtToken );
router.put("/detailsUpdate");
//route for user login
//router.post("/register",loginUser);


// const express = require("express");
// const router = express.Router();
// const {
//     registerUser
//     // loginUser
// }=require("../controllers/userController");
// router.post("/" , registerUser);
module.exports=router;
