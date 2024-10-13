const express = require("express");
const zod = require("zod");
const { Users, Organs, Patient } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_token } = require("../config");
const { authMiddleware } = require("../authMiddleware");
const router = express.Router();

// Schema for validating input
const createSchema = zod.object({
    userName: zod.string(),
    organ: zod.string()
});
router.post("/patientLogin",async(req,res)=>{
    const body=req.body
    const patient=await Patient.findOne({userName:body.userName})
    if(!patient){
        return res.status(411).json({ message: "Patient Does not Exists" });
    }
    res.json({message:"Logged in successfully"})
})
// Create a new patient
router.post("/createPatient", async (req, res) => {
    const body = req.body;
    const { success, error } = createSchema.safeParse(body);

    if (!success) {
        console.error("Validation error:", error);
        return res.status(400).json({ message: "Incorrect input" });
    }

    const { userName, organ } = body;

    // Check if the patient already exists
    const patient = await Patient.findOne({ userName: userName });
    if (patient) {
        return res.status(409).json({ message: "Patient Already Exists" });
    }

    const newPatient = await Patient.create({ userName:userName, organNeeded:organ });
    res.status(201).json({ message: "Patient Created", newPatient });
});

// Get patient details
router.get("/patientDetails", async (req, res) => {
    try {
        const patients = await Patient.find();

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        res.json({
            patients: patients.map(patient => ({
                userName: patient.userName,
                organNeeded:patient.organNeeded
            }))
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Error fetching patients", error });
    }
});

// Remove a patient
router.delete("/removePatient/:userName", async (req, res) => {
    const { userName } = req.params;

    const deletedPatient = await Patient.findOneAndDelete({ userName: userName });
    if (!deletedPatient) {
        return res.status(404).json({ message: "User Not Found" });
    }
    
    res.json({ message: "User Deleted" });
});
router.get("/organs",async(req,res)=>{
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
module.exports = router;
