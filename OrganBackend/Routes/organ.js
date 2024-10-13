const express=require("express")
const zod=require ("zod")
const { Users, Organs } = require("../db")
const jwt=require("jsonwebtoken")
const { JWT_token } = require("../config")
const { authMiddleware } = require("../authMiddleware")
const router=express.Router()
const organSchema=zod.object({
    organName:zod.string(),
    bloodgroup: zod.string(),
    quantity:zod.number().min(1)
})
router.post("/add-organ",authMiddleware,async(req,res)=>{
    const body=req.body;
    const {success}=organSchema.safeParse(body)
    const {organName,bloodgroup,quantity}=body;
    if(!success){
        return res.status(411).json({message:"invalid information"})
    }
    const user=await Users.findOne({
        _id:req.hId
    })
    if(!user){
        return res.status(404).send("User not found");
    }
    const existingOrgan=user.organs.find(organ=>organ.organName===organName && organ.bloodgroup===bloodgroup);
    if(existingOrgan){
            existingOrgan.quantity+=quantity;
    }else{
        user.organs.push({organName,bloodgroup,quantity})
    }
    await user.save();
    res.send("Organ added successfully")
})

module.exports=router;
