import { Link, useNavigate } from "react-router-dom";

export function BottomWarning({lable,buttonText,to}){
    const navigate=useNavigate();
    return <div className="py-2 text-sm flex justify-center">
        <div>{lable}</div>
        {/* <div className="text-red-500 hover:font-semibold cursor-pointer" onClick={()=>{
            navigate({to})
        }}>{buttonText}</div> */}
        <Link className="text-red-500 hover:font-semibold cursor-pointer" to={to}>{buttonText}</Link>
    </div>
}