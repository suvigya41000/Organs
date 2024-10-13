const mongoose=require("mongoose");
const { Db_Url } = require("./config.js");
console.log(Db_Url)
mongoose.connect(Db_Url)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection failed:", error));


const userSchema=new mongoose.Schema({
    userName:String,
    password:String,
    orgName:String,
    address:String,
    state:String,
    city:String,
    contact:Number,
    organs:[{
        organName: String,
        bloodgroup: String,
        quantity: Number
    }]

})
const Users=mongoose.model('Users',userSchema);
const patientSchema=new mongoose.Schema({
    userName:String,
    organNeeded:String
})
const Patient=mongoose.model('Patient',patientSchema)
module.exports={ 
    Users,
    Patient
 }