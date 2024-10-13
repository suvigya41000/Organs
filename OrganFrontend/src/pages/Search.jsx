import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { OrgDetails } from "../components/OrganisationDetails";

export const Search=()=>{
    const [organ,setOrgan]=useState("");
    const [city,setCity]=useState("");
    const [state,setState]=useState("");
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?organ="+organ+"&state="+state+"&city="+city,{
            headers:{
                authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            setUsers(response.data.hospital)
        })
    },[organ,state,city])
    return <div className="flex p-2" >
        <div className="p-2 h-max w-full">
    <div className="text-2xl font-semibold text-teal-500 mx-4">Search Parameters:</div>
    <div className="w-80 mx-4">
        <InputBox placeholder={"Organ"} onChange={e=>{
            setOrgan(e.target.value)
        }}/>
        <InputBox placeholder={"State"} onChange={e=>{
            setState(e.target.value)
        }}/>
        <InputBox placeholder={"City"} onChange={e=>{
            setCity(e.target.value)
        }}/>
          
    </div>
    <div className="w-full h-max p-2">
    <div className=" flex bg-white h-max w-full p-4 justify-between">
    {users.length > 0 ? (
        <div className="grid grid-cols-1 md:justify-between w-full md:grid-cols-3 ">
                    {users.map((user, index) => ( 
                        <OrgDetails
                            key={index}
                            orgName={user.orgName}
                            address={user.address}
                            city={user.city}
                            state={user.state}
                            organs={user.organs}
                            contact={user.contact}
                        />
                    ))}</div>
                ) : (
                    <div>No results found</div>
                )}    
        </div>

    </div>
    
    </div>
    </div>
    
}