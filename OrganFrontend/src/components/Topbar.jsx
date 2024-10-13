import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

export const Topbar = () => {
  const [orgName, setOrgName] = useState("");
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!isOpen);
  };

  const fetchUserDetails = async () => {
    await axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setOrgName(response.data.user.orgName);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <nav className="flex justify-between w-full  bg-slate-900 h-14 text-white items-center px-4 ">
      <div>Organ Doner</div>
      <div className="flex gap-4">
        <div className="cursor-pointer hover:underline" onClick={()=>{
                  navigate("/dashboard")
              }}>Home</div>
        <div className="cursor-pointer hover:underline" onClick={()=>{
                  navigate("/search")
              }}>Search</div>
        <div className="cursor-pointer hover:underline" onClick={()=>{
                  navigate("/organs")
              }}>
                Profile
              </div>
        <div className="cursor-pointer hover:underline " onClick={()=>{
                navigate("/createPatient")
              }}>Create Patient</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    </nav>
  );
  // return <div className="w-12 lg:w-64 bg-blue-400 transition-all duration-1000">
  //     <div className="fixed h-screen ">
  //     <div className={`h-full bg-blue-400 transition-all duration-1000 w-12 lg:w-64`}>
  //         <div className=" h-max p-2 bg-blue-700 hidden lg:block">
  //             <div className="text-2xl text-white ">Welcome</div>
  //             <div className="text-4xl text-white ">{orgName}</div>
  //         </div>
  //         <div className="flex p-2 ml-1 ">
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-6 h-6 text-white cursor-pointer block mt-1 lg:hidden" onClick={toggleSidebar} >
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  //             </svg>
  //         </div>
  //         <div className="flex hover:bg-red-400 p-2 cursor-pointer" onClick={()=>{
  //                 navigate("/dashboard")
  //             }}>
  //         <div className="flex justify-end ml-1">
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white w-6 h-6 cursor-pointer ">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  //             </svg>
  //             </div>
  //             <div className="relative text-white  px-4 hidden lg:block ">Dashbard</div>
  //         </div>
  //         <div className="hidden lg:block p-2 ">
  //             <hr className="text-red-300"></hr>
  //         </div>
  //         <div className="flex hover:bg-red-400 p-2 cursor-pointer" onClick={()=>{
  //                 navigate("/search")
  //             }}>
  //         <div className="flex justify-end ml-1">
  //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white w-6 h-6  cursor-pointer">
  //                     <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  //                 </svg>
  //             </div>
  //             <div className="relative text-white  px-4 hidden lg:block">Search</div>
  //         </div>

  //         <div className="hidden lg:block p-2 ">
  //         <hr className="text-red-300"></hr>
  //         </div>
  //         <div className="flex hover:bg-red-400 p-2 cursor-pointer" onClick={()=>{
  //                 navigate("/organs")
  //             }}>
  //         <div className="flex justify-end ml-1">
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white w-6 h-6  cursor-pointer">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
  //             </svg>

  //             </div>
  //             <div className="relative text-white  px-4 hidden lg:block">Organs</div>
  //         </div>

  //         <div className="hidden lg:block p-2 ">
  //         <hr className="text-red-300"></hr>
  //         </div>
  //         <div className="flex hover:bg-red-400 p-2 cursor-pointer" onClick={()=>{
  //               navigate("/createPatient")
  //             }}>
  //         <div className="flex justify-end ml-1">
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white w-6 h-6  cursor-pointer">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  //             </svg>
  //             </div>
  //             <div className="relative text-white  px-4 hidden lg:block">Patients</div>
  //         </div>

  //         <div className="hidden lg:block p-2 ">
  //         <hr className="text-red-300"></hr>
  //         </div>
  //         <div className="flex hover:bg-red-400 p-2 cursor-pointer" onClick={()=>{
  //               localStorage.removeItem("token")
  //               navigate("/")
  //             }}>
  //         <div className="flex justify-end ml-1">
  //                 <img className="w-6 h-6 rounded-full" src="/Logo.png"/>
  //             </div>
  //             <div className="relative text-white  px-4 hidden lg:block">SignOut</div>
  //         </div>

  //         <div className="hidden lg:block p-2 ">
  //         <hr className="text-red-300"></hr>
  //         </div>

  //     </div>

  // </div>
  // </div>
};
