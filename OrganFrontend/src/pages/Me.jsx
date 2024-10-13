import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const Me=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        const key=localStorage.getItem("token")
    if(key==null){
        navigate("/signin")
    }else{
        navigate("/dashboard")
    }
    },[navigate])
    return null
    
}