import { useState } from "react";
// import eye-slash from './assets/hide.svg';
// import showLogo from './assets/show.svg';
const hide=<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
const show=<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

export function InputBox({lable,placeholder,onChange,type="text",value}){
    const[inputType,setInputType]=useState(type)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track visibility state

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        setInputType(isPasswordVisible ? "password" : "text");
    }
    return (<div className="text-black text-sm font-medium text-left py-2 ">
        {lable}
        <div className=" flex border rounded border-slate-200 hover:outline outline-red-500 outline-1">
        <input value={value} type={inputType} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 focus:outline-none h-max"/>
        {type=="password" &&<div className="flex flex-col items-center justify-center"> <button type="button" onClick={togglePasswordVisibility}
        className="pr-2 rounded  text-sm text-center text-blue-500 focus:outline-none hover:font-semibold hover:text-blue-700 ">{isPasswordVisible?hide:show}</button></div> }
        </div>
        
    </div>)
}