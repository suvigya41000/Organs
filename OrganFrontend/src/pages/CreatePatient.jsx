import { useEffect, useState } from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

export const CreatePatient = () => {
    const [newPatient, setNewPatient] = useState("");
    const [patients, setPatients] = useState([]);
    const [organ, setOrgan] = useState("");
    const [count,setCount]=useState(0)
    const fetchPatients = () => {
        axios.get("http://localhost:3000/api/v1/patient/patientDetails")
            .then(response => {
                setPatients(response.data.patients);
            })
            .catch(error => {
                console.error("Error fetching patients:", error);
            });
    };

    useEffect(() => {
        fetchPatients();
    }, [count]); // Fetch patients on initial mount

    const handleCreatePatient = async () => {
        try {
            await axios.post("http://localhost:3000/api/v1/patient/createPatient", {
                userName: newPatient,
                organ: organ
            });
            fetchPatients(); // Refresh patient list after creation
            setNewPatient(""); // Clear the input
            setOrgan(""); // Clear the organ input
        } catch (error) {
            console.error("Error creating patient:", error.response ? error.response.data : error.message);
        }
        setCount(count+1)
    };

    const handleDeletePatient = async (userName) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/patient/removePatient/${userName}`);
            fetchPatients(); // Refresh patient list after deletion
        } catch (error) {
            console.error("Error deleting patient:", error.response ? error.response.data : error.message);
        }
        setCount(count-1)
    };

    return (
        <div className="p-4 w-full h-screen relative bg-blue-50 flex flex-col ">
            <div className="w-max">
            <InputBox
                lable={"Create Patient Id"}
                placeholder={"patientId@curecrew"}
                onChange={e => setNewPatient(e.target.value)}
                value={newPatient}
            />
            <InputBox
                lable={"Organ Needed"}
                placeholder={"Organ Needed"}
                onChange={e => setOrgan(e.target.value)}
                value={organ}
            />
            <button onClick={handleCreatePatient} className="text-white bg-black border rounded p-2 mt-2 ">
                Create Patient
            </button>
            </div>
            

            <div className=" mt-8">
                <h3>Patient List</h3>
                <div className="flex flex-col bg-white h-max w-full justify-between ">
                    {patients.length > 0 ? (
                        patients.map((patient, index) => (
                            <div key={index} className="flex justify-between items-center p-2 m-2 shadow bg-blue-50">
                                <PatientDetails userName={patient.userName} organ={patient.organNeeded}/>
                                {console.log(patient.organNeeded)}
                                <button
                                    onClick={() => handleDeletePatient(patient.userName)} className="p-1 px-2  bg-black text-white rounded"
                                > Delete </button>
                            </div>
                        ))
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

function PatientDetails({ userName,organ }) {
    return (
        <div>
            <p>User Name: {userName}</p>
            <p>Organ needed: {organ}</p>
        </div>
    );
}
