import axios from "axios";
import { useEffect, useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Patient = () => {
    const [hospitals, setHospitals] = useState([]); // Store multiple hospitals
    const [organ, setOrgan] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const navigate=useNavigate();
    const fetchHospitalDetails = () => {
        axios
            .get(`http://localhost:3000/api/v1/patient/organs?organ=${organ}&state=${state}&city=${city}`)
            .then(response => {
                setHospitals(response.data.hospital); // Assuming API returns an array of hospitals
            })
            .catch(error => {
                console.error("Error fetching hospital details:", error);
            });
    };

    useEffect(() => {
        fetchHospitalDetails(); // Fetch hospitals on mount without filters
    }, []);

    return (
        <div className="p-4 w-full relative">
            {/* Signout button positioned at the top-right corner */}
            <div className="absolute top-4 right-4 border bg-red-500 text-white font-semibold p-2 hover:bg-red-600 w-max rounded cursor-pointer" onClick={()=>{
                navigate("/signin")
            }}>
                Signout
            </div>
            
            <div className="text-2xl font-semibold text-red-500 mx-4 mt-12">Search Parameters:</div>
            <div className="w-80 mx-4">
                <InputBox 
                    placeholder={"Organ"} 
                    onChange={e => { 
                        setOrgan(e.target.value);
                        fetchHospitalDetails();
                    }} 
                />
                <InputBox 
                    placeholder={"State"} 
                    onChange={e => {
                        setState(e.target.value);
                        fetchHospitalDetails();
                    }} 
                />
                <InputBox 
                    placeholder={"City"} 
                    onChange={e => { 
                        setCity(e.target.value);
                        fetchHospitalDetails();
                    }} 
                />
                <Button
                    lable={"Search"}
                    onClick={fetchHospitalDetails} // Trigger fetch when search is clicked
                />
            </div>

            {hospitals.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 justify-between shadow p-2 mt-4">
                    {hospitals.map((hospital, index) => (
                        <div key={index} className="w-full h-max border-slate-500 border p-4 mb-4 m-2 bg-white">
                            <div>User Name: {hospital.userName}</div>
                            <div>Organization: {hospital.orgName}</div>
                            <div>Address: {hospital.address}</div>
                            <div>City: {hospital.city}</div>
                            <div>State: {hospital.state}</div>
                            <div>
                                <div className="flex flex-col justify-center items-center font-semibold text-red-500 text-2xl">
                                    Organs
                                </div>
                                <div className="grid grid-cols-1 gap-2  sm:grid-cols-3 justify-between shadow p-2 ">
                                    {hospital.organs.map((organ, index) => (
                                        <Organs key={index} organ={organ} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No hospital details found or loading...</div>
            )}
        </div>
    );
};

function Organs({ organ }) {
    return (
        <div className="border rounded my-2 p-2 w-full h-max bg-red-100 border-red-300">
            <div>Organ: {organ.organName}</div>
            <div>Blood Group: {organ.bloodgroup}</div>
        </div>
    );
}
