var jwt=require('jsonwebtoken');

// const generateToken=(userData)=>{
  
//   return jwt.sign(userData,process.env.PRIVATE_KEY);
// }

const validateJwtToken = (req,res,next)=>{
   //first we are checking thagt jwt token is available or not.
   const authorization =req.headers.authorization;
   //output: 1. bearer dhsiudshfiudsfi
   //output: 2. dhsiudshfiudsfi
   //output: 3.''
   //output: 4. token bna hi ni hi local ho ya endpoint testing se bejha ho,without token header send kra hai
   if(!authorization){
    return res.status(401).json({err:'Token not available'})
   }
   // we are storing the token values from headerds and splitting to get "bearer xyz.abc.khj"
   const token = req.headers.authorization.split(' ')[1]
   if(!token){
    return res.status(401).json({err:'unauthorized error'});
   }


   try{
       const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);
       req.user=validateToken;
       next
   }catch(err){
    console.error("error occured: ",err.message);
   }

  
}
module.exports = {validateJwtToken};
