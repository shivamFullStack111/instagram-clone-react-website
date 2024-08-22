import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import toast , {Toaster} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { setloading } from "./store/Slices/userSlice";

const Login = () => {
  const [active,setactive]=useState(1)
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const dispatch = useDispatch()

  const handlesubmit = async() =>{
    dispatch(setloading(true))
    const res = await axios.post('http://localhost:8000/login',{email,password})
    if(res?.data?.success){
       Cookies.set('login_token',res?.data?.token)
       toast.success(res.data.message)
       dispatch(setloading(false))
       window.location.reload()
    } else {
      toast.error(res.data.message)
    }
    dispatch(setloading(false))
    setemail('')
    setpassword('')
 }

  const onfocus=(data)=>{
     setactive(data)
  }
  const onblur=()=>{
     setactive(0)
  }

  return (
   <div className="flex justify-center items-center  w-full min-h-screen"> <Toaster></Toaster>
       <div className="h-[95vh] max-600px:w-full max-600px:h-screen bg-[#f0eeee] max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px] border-2 border-black b rounded-2xl">
       <p className="mt-4 pl-4"><Link to={'/register'}><FaArrowLeftLong /></Link></p>
         <p className="w-full text-center text-[12px] mt-6">English (US)</p>
         {/* instagram icon */}
         <div className="flex justify-center">
           <img className="w-12 mt-12" src="https://static-00.iconduck.com/assets.00/instagram-icon-2048x2048-uc6feurl.png" alt="" />
         </div>
         <div className="w-full h-[70%] flex items-center  flex-col">
             <div className={`w-[90%] flex border bg-white rounded-xl mt-16 p-3 ${active==1&&'border-black'}`}>
               <div className="w-[95%]">
                  <p className="text-[12px] text-gray-500">Username, email address</p>
                  <input value={email} onBlur={onblur} onFocus={()=>onfocus(1)} onChange={(e)=>setemail(e.target.value)} className="w-full outline-none" type="text" /> 
               </div>
               <div>
                    {email&&<div className="h-full w-full flex justify-end items-center text-gray-500"><RxCross1 onClick={()=>setemail('')}  size={22}></RxCross1></div>}  
               </div>
             </div>

             <div className={`w-[90%] h-[4.2rem] flex items-center border bg-white rounded-xl mt-2 p-3 ${active==2&&'border-black'}`}>
               <div className="w-[95%] ">
                  {active==2&&<p className="text-[12px] text-gray-500">Password</p>}
                  <input value={password} onBlur={onblur} onFocus={()=>onfocus(2)} onChange={(e)=>setpassword(e.target.value)} className="w-full outline-none placeholder:text-gray-400" placeholder="Password" type="text" /> 
               </div>
               <div>
                    {password&&<div className="h-full w-full flex justify-end items-center text-gray-500"><RxCross1 onClick={()=>setpassword('')} size={22}></RxCross1></div>}  
               </div>
             </div>

             <button onClick={handlesubmit} className="w-[90%] bg-blue-500 text-white font-semibold rounded-2xl h-11 mt-4">Log in</button>
             <p className="font-semibold text-[15px] mt-4">Forgot Password?</p>

             
             <button type="button" className="w-[90%] text-blue-500 border font-bold border-blue-500 text-sm rounded-2xl h-11  mt-auto"><Link to={'/register'} className="w-full h-full">Create new account</Link></button>
         </div>
       </div>
   </div>
  )
}

export default Login