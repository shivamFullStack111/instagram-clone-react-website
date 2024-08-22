import { useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Register = () => {
  const [active,setactive]=useState(1)
  const [name, setname] = useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

  const handlesubmit = async() =>{
     const res = await axios.post('http://localhost:8000/register',{name,email,password})
     if(res?.data?.success){
        Cookies.set('login_token',res?.data?.token)
        toast.success(res.data.message)
        window.location.reload()
      } else {
        toast.error(res.data.message)
      }
      setemail('')
      setpassword('')
   
     setname('')
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
   <div className="flex justify-center items-center  w-full min-h-screen"> <Toaster/>
       <div className="h-[95vh] max-600px:w-full max-600px:h-screen bg-[#f0eeee] max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px] border-2 border-black b rounded-2xl">
         <p className="mt-4 pl-4"><Link to={'/login'}><FaArrowLeftLong /></Link></p>
         <p className="w-full text-center text-[12px] mt-6">English (US)</p>
         {/* instagram icon */}
         <div className="flex justify-center">
           <img className="w-12 mt-12" src="https://static-00.iconduck.com/assets.00/instagram-icon-2048x2048-uc6feurl.png" alt="" />
         </div>
         <div className="w-full h-[70%] flex items-center  flex-col">

         <div className={`w-[90%] flex border bg-white rounded-xl mt-12 p-3 ${active==3&&'border-black'}`}>
               <div className="w-[95%]">
                  <p className="text-[12px] text-gray-500">Name</p>
                  <input value={name} onBlur={onblur} onFocus={()=>onfocus(3)} onChange={(e)=>setname(e.target.value)} className="w-full outline-none" type="text" /> 
               </div>
               <div>
                    {name&&<div className="h-full w-full flex justify-end items-center text-gray-500"><RxCross1 onClick={()=>setname('')} size={22}></RxCross1></div>}  
               </div>
             </div>


             <div className={`w-[90%] flex border bg-white rounded-xl mt-2 p-3 ${active==1&&'border-black'}`}>
               <div className="w-[95%]">
                  <p className="text-[12px] text-gray-500"> email address</p>
                  <input value={email} onBlur={onblur} onFocus={()=>onfocus(1)} onChange={(e)=>setemail(e.target.value)} className="w-full outline-none" type="text" /> 
               </div>
               <div>
                    {email&&<div className="h-full w-full flex justify-end items-center text-gray-500"><RxCross1 onClick={()=>setemail('')} size={22}></RxCross1></div>}  
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

             <button onClick={handlesubmit} className="w-[90%] bg-blue-500 text-white font-semibold rounded-2xl h-11 mt-4">Sign in</button>
             <p className="font-semibold text-[15px] mt-4">Already have an account?</p>

             
             <button type="button" className="w-[90%] text-blue-500 border font-bold border-blue-500 text-sm rounded-2xl h-11  mt-auto"><Link to={'/login'} className="w-full h-full">Login</Link></button>
         </div>
       </div>
   </div>
  )
}

export default Register