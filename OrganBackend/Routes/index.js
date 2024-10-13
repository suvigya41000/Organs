const { Router } = require("express");
const userRouter=require("./user")
const organRouter=require("./organ")
const patientRouter=require("./patient")
const router=Router();
router.use("/user",userRouter);
router.use("/organs",organRouter)
router.use("/patient",patientRouter)
module.exports=router;