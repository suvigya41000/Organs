const {Router}=require("express")
const zod=require ("zod")
const { Users } = require("../db")
const jwt=require("jsonwebtoken")
const { JWT_token } = require("../config")
const { authMiddleware } = require("../authMiddleware")
const router=Router()

const signupSchema=zod.object({
    userName:zod.string(),
    orgName:zod.string(),
    address:zod.string(),
    state:zod.string(),
    city:zod.string(),
    contact:zod.string().min(10).max(10),
    password:zod.string()
})
router.post("/signup",async(req,res)=>{
    const body=req.body;
    const{success,error}=signupSchema.safeParse(body);
    if(!success){
        console.error("Validation error:", error);
        return res.status(411).json({message:"Incorrect input"})
    }
    const user=await Users.findOne({userName:body.userName})
    if(user){
        res.status(411).json({message:"User already exist"})
    }
    const newUser=await Users.create(body);
    const token=jwt.sign({hId:newUser._id},JWT_token)
    res.json({
        message:"User Created Scuccessfully",
        token:token
    })
})
const signinSchema=zod.object({
    userName:zod.string(),
    password:zod.string()
})
router.post("/signin",async (req,res)=>{
    const body=req.body;
    const{success}=signinSchema.safeParse(body);
    if(!success){
        return req.status(411).json({message:"Incorrect input"})
    }
    const user=await Users.findOne({
        userName:body.userName,
        password:body.password
    })
    if(user){
        const token=jwt.sign({hId:user._id},JWT_token)
        res.json({
            message:"signed in successfully",
            token:token
        })
    }
})
router.get("/bulk",authMiddleware ,async (req,res)=>{
    const organFilter=req.query.organ || "";
    const stateFilter=req.query.state || "";
    const cityFilter=req.query.city || "";
    let query={};
    if(organFilter){
        query["organs.organName"]={$regex:new RegExp(organFilter,"i")}
    }
    if(cityFilter){
        query["city"]={$regex:new RegExp(cityFilter,"i")}
    }
    if(stateFilter){
        query["state"]={$regex:new RegExp(stateFilter,"i")}
    }
    const hospitals = await Users.find(query);
    console.log(hospitals)
    res.json({
        hospital:hospitals.map(hospital=>({
            userName:hospital.userName,
            orgName:hospital.orgName,
            address:hospital.address,
            city:hospital.city,
            state:hospital.state,
            organs:hospital.organs,
            contact:hospital.contact,
            _id:hospital._id
        }))
    })
})
router.get("/details",authMiddleware,async (req,res)=>{
    const hospital=await Users.findOne({
        _id:req.hId
    })
    if(!hospital){
        return res.status(403).json({message:" such no user found"})
    }
    return res.json({user:{
        userName:hospital.userName,
            orgName:hospital.orgName,
            address:hospital.address,
            city:hospital.city,
            state:hospital.state,
            organs:hospital.organs,
            contact:hospital.contact,
            _id:hospital._id
        }  
    })
})
module.exports=router;
