export function Button({lable,onClick}){
    return <button onClick={onClick} className="w-full px-5 py-2.5 m2-2 mb-2 hover:bg-gray-900 border rounded-lg border-slate-200 text-center text-white bg-gray-800 focus:outline-none font-medium text-sm">
        {lable}
    </button>
    
}