const { JWT_token } =require("./config.js") ;

const jwt= require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message:"not authorised"})
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,JWT_token)
        req.hId=decoded.hId;
        next();
    }
    catch(err){
        return res.status(405).json({message:"invalid token"})
    }
}
module.exports={
    authMiddleware
}
