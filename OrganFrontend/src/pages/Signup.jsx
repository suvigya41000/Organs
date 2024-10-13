import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const navigate=useNavigate()
    const[error,setError]=useState("")
    const [userName,setUserName]=useState("");
    const [orgName,setOrgName]=useState("");
    const [password,setPassword]=useState("");
    const [contact,setContact]=useState("");
    const [address,setAddress]=useState("");
    const [state,setState]=useState("");
    const [city,setCity]=useState("");
    return <div >
        <div className="flex flex-col sm:flex-row justify-between w-screen sm:h-screen bg-slate-200">
            <div className="flex flex-col justify-center items-center h-full w-full text-lg sm:text-5xl font-bold p-2 ">
                <div className="flex sm:flex-col border border-slate-500 p-4 border-x-0 border-y-2 border-red-700 ">
                SAVE : DONATE : FIND
                </div> 
            </div>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max border shadow px-4 m-4">
                    <Heading lable={"Signup"}/>
                    <InputBox lable={"Organisation Name"} placeholder={"Name of organisation"} onChange={e=>{
                        setOrgName(e.target.value)
                    }}/>
                    <InputBox lable={"UserName"} placeholder={"hospital_123"} onChange={e=>{
                        setUserName(e.target.value)
                    }}/>
                    <InputBox lable={"Address"} placeholder={"Mansarover jaipur"} onChange={e=>{
                        setAddress(e.target.value)
                    }}/>
                    <div className="flex">
                        <div className="mr-2">
                            <InputBox lable={"City"} placeholder={"Name of City"} onChange={e=>{
                        setCity(e.target.value)
                    }}/>
                        </div>
                        <div>
                            <InputBox lable={"State"} placeholder={"Name of State"} onChange={e=>{
                        setState(e.target.value)
                    }}/>
                        </div>
                    </div>
                    
                    <InputBox lable={"Password"} placeholder={"Password"} type={"password"} onChange={e=>{
                        setPassword(e.target.value)
                    }}/>
                    <InputBox lable={"Contact"} placeholder={"Contact number..."} onChange={e=>{
                        setContact(e.target.value)
                    }}/>
                    <Button lable={"Signup"} onClick={async ()=>{
                        await axios.post("http://localhost:3000/api/v1/user/signup",{
                            userName,
                            orgName,
                            address,
                            state,
                            city,
                            contact,
                            password
                        }).then(response=>{
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")
                        }).catch(err=>{
                            if(err.response && err.response.status===411){
                                alert("Email already taken or incorrect input")
                                setError(err.response.data.message)
                            }
                        })
                    }}/>
                    {error && <div className="text-red-500 text-sm mb-1">{error}</div>}
                    <BottomWarning lable={"Already a user?"} buttonText={"Signin"} to={"/signin"}/>
                    <hr></hr>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <div>
                        <Button lable={"Patient login"} onClick={()=>{
                            navigate("/patientLogin")
                        }}/>

                        </div>
                    
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
}