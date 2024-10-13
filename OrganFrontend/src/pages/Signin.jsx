import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Signin=()=>{
    const navigate=useNavigate()
    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();
    return <div className="w-screen">
        <div className="flex flex-col sm:flex-row justify-between h-screen bg-slate-200">
            <div className="flex justify-center items-center h-max sm:h-full w-full text-lg sm:text-5xl font-bold p-2 pt-4 sm:pt-0">
                <div className="flex sm:flex-col border border-slate-500 p-4 border-x-0 border-y-2 border-red-700 ">
                SAVE : DONATE : FIND
                </div>  
            </div>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max border shadow px-4 m-4">
                    <Heading lable={"Signin"}/>
                    <InputBox lable={"Username"} placeholder={"Username..."} onChange={e=>{
                        setUserName(e.target.value)
                    }}/>
                    <InputBox lable={"Password"} placeholder={"Password..."} type={"password"} onChange={e=>{
                        setPassword(e.target.value)
                    }}/>
                    <Button lable={"Signin"} onClick={async ()=>{
                        await axios.post("http://localhost:3000/api/v1/user/signin",{
                            userName,
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
                    <BottomWarning lable={"Dont have an user?"} buttonText={"Signup"} to={"/signup"}/>
                    <hr></hr>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <div>
                        <Button lable={"Patient login"} onClick={()=>{
                            navigate("/patientLogin")
                        }}/>

                        </div>
                    
                    </div>
                    
                    <div>

                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
}