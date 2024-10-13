import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const Organ = () => {
  const [user, setUser] = useState({});
  const [organName, setOrganName] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [quantity, setQuantity] = useState();
  const fetchUserDetails = () => {
    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full text-white p-2">
        <div className="w-full h-max p-4">

      <div className="flex text-3xl justify-center font-bold pb-4 text-teal-400">Hospital details</div>
      <div className="border border-slate-500 p-4 rounded-2xl bg-slate-950 bg-[radial-gradient(#ffffff33_1px,#10023b_1px)] bg-[size:20px_20px]">
        {/* Conditional rendering to prevent accessing undefined user */}
        {user ? (
          <div>
            <div>User Name: {user.userName}</div>
            <div>Organization: {user.orgName}</div>
            <div>Address: {user.address}</div>
            <div>City: {user.city}</div>
            <div>State: {user.state}</div>
            <div>
              <div className="flex flex-col justify-center items-center font-semibold text-teal-400 text-2xl">
                Organs
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 justify-between shadow p-2">
                {user.organs?.map((organ, index) => (
                  <div
                    key={index}
                    className="shadow border border-blue-500 rounded-xl m-1 p-2 hover:bg-[#00091d] "
                  >
                    <div>Organ Name: {organ.organName}</div>
                    <div>Quantity: {organ.quantity}</div>
                    <div>Blood Group: {organ.bloodgroup}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading user details...</div>
        )}
      </div>
        </div>
      <div className="m-2 p-2">
        <div className="text-2xl font-bold text-teal-400">Add New Organ</div>
        <div className="flex flex-cols items-center">
          <div className="mr-2 w-40">Organ Name:</div>
          <InputBox
          placeholder={"organ name"}
            value={organName}
            onChange={(e) => {
              setOrganName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-cols items-center">
          <div className="mr-2 w-40">Bloodgroup:</div>
          <InputBox
          placeholder={"bloodgroup"}
            value={bloodgroup}
            onChange={(e) => {
              setBloodgroup(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-cols items-center">
          <div className="mr-2 w-40">Quantity:</div>
          <InputBox
          placeholder={"quantity"}
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          />
        </div>
        <div>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[58vh] " onClick={async () => {
            await axios.post(
              "http://localhost:3000/api/v1/organs/add-organ",
              {
                organName,
                bloodgroup,
                quantity,
              },
              {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            fetchUserDetails();
            // Optionally, clear the form after submission
            setOrganName("");
            setBloodgroup("");
            setQuantity("");
            alert("Organ added successfully!");
          }}>Add Organ</button>

        </div>
        
      </div>
    </div>
  );
};
