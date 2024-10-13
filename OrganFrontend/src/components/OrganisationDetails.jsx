import { useState } from "react"

export function OrgDetails(props){
    const[isOpen,setOpen]=useState(true)

    const toggleOrganNames=()=>{
        setOpen(!isOpen)
    }
    return <div className="p-4 justify-center">
        <div className="flex border  rounded shadow m-4 p-4 w-full hover:bg-red-50 hover:border-red-200 hover:shadow-lg">
        <div className="w-full lg:w-60">
            <div className="text-xl font-bold text-red-500">{props.orgName}</div>
            <div className="text-sm underline ">{props.address}</div>
            <div>
                <div className="flex">
                <div className="font-bold">State:</div>
                    <div>{props.state}</div>
                </div>
                <div className="flex">
                    <div className="font-bold">City:</div>
                    <div>{props.city}</div>
                </div>
                <div className="flex">
                    <div className="font-bold">Contact:</div>
                    <div>{props.contact}</div>
                </div>
            </div>
            <div onClick={toggleOrganNames} className="flex felx-col items-center justify-center w-full mt-2 ">
                <div className="border flex items-center p-2 rounded text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-semibold cursor-pointer">
                    <div className={`${isOpen?"block":"hidden"}`}>Click for Organ Details</div>
                    <div className={`${isOpen?"hidden":"block"}`}>Click to hide</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-4  ${isOpen?"block":"hidden"}`}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-4  ${isOpen?"hidden":"block"}`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                            </svg>
                    </div>
                

            </div>
            <div className={`mt-2 ${isOpen?"hidden":"block"}`}>{props.organs?.length > 0 ? (
                        props.organs.map((organ, index) => (
                            <Organs key={index} organ={organ} />
                        ))
                    ) : (
                        <div>No organs available</div>
                    )}</div>
        </div>
    </div>
    </div>
    
}
function Organs({organ}){
    return <div className="border rounded my-2 p-2 w-full h-max bg-red-100 border-red-300">
        <div>Organ:{organ.organName}</div>
        <div>Quantity:{organ.quantity}</div>
        <div>Bloodgroup:{organ.bloodgroup}</div>
    </div>
}