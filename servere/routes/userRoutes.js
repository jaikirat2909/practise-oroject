const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser
}=require("../controllers/userController");
//route for user registration 
router.post("/register",registerUser);
router.post("/login", loginUser);
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