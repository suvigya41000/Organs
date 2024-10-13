import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Search } from './pages/Search'
import { Topbar } from './components/Topbar'
import { Organ } from './pages/Organs'
import { Me } from './pages/Me'
import { CreatePatient } from './pages/CreatePatient'
import { Patient } from './pages/Patient'
import { PatientLogin } from './pages/PatientLogin'

function App() {

  return (
    <BrowserRouter>
    <AppWrapper/>
    </BrowserRouter>
  )
}
function AppWrapper(){
  const location=useLocation();
  const noSidebarRoutes=["/signin","/signup","/patientLogin","/patient"]
  return (
    <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
    {!noSidebarRoutes.includes(location.pathname)&&<Topbar/>}
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Me/></Suspense>}/>
      <Route path="/dashboard" element={<Suspense fallback={<div>loading...</div>}><Dashboard/></Suspense>} ></Route>
      <Route path="/search" element={<Suspense fallback={<div>loading...</div>}><Search/></Suspense>} ></Route>
      <Route path="/signin" element={<Suspense fallback={<div>loading...</div>}><Signin/></Suspense>} ></Route>
      <Route path="/signup" element={<Suspense fallback={<div>loading...</div>}><Signup/></Suspense>} ></Route>
      <Route path="/organs" element={<Suspense fallback={<div>loading...</div>}><Organ/></Suspense>} ></Route>
      <Route path="/createPatient" element={<Suspense fallback={<div>loading...</div>}><CreatePatient/></Suspense>} ></Route>
      <Route path="/Patient" element={<Suspense fallback={<div>loading...</div>}><Patient/></Suspense>} ></Route>
      <Route path="/patientLogin" element={<Suspense fallback={<div>loading...</div>}><PatientLogin/></Suspense>} ></Route>
    </Routes>
    </div>
   )
}

export default App
