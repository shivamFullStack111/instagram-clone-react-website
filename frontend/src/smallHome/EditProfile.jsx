import { useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";


const EditProfile = (  setEditOpen ) => {
  const {user}=useSelector(state=>state.user)
  const [name, setname] = useState(user?.name ||'')
  const [username, setusername] = useState(user?.username||'')
  const [bio, setbio] = useState(user?.bio)
  const [gender, setgender] = useState(user?.gender||'')
  const [phonenumber, setphonenumber] = useState(user?.phonenumber||'')
  const [email, setemail] = useState(user?.email||'')
  const [image,setimage]=useState(null)

  const handlesubmit =async()=>{
    const data ={
      name:name || user.name,
      username:username || user.username,
      bio:bio || user.bio,
      gender:gender||user.gender,
      phonenumber:phonenumber || user.phonenumber,
      email:user.email || email
    }
    const res = await axios.post('http://localhost:8000/updateprofile',data)
    console.log(res.data)
    if(res?.data?.success){ 
    toast.success(res.data.message)
    window.location.reload() 
    }
    else toast.error(res?.data?.message)
    window.location.reload() 
  }

  const handlesetimage=async(e)=>{
     const imageurl = e.target.files[0]
     setimage(imageurl)

     const formdata = new FormData
     formdata.append('file',imageurl)
     formdata.append('email',user?.email)

     if(imageurl){
      const res = await axios.post('http://localhost:8000/updateimage',formdata)
      if(res?.data?.success){
         toast.success('Image updated successfully')
         window.location.reload() 
      }
      else toast.error(res?.data?.message)
     }

  }

  return (
   <div className="flex  absolute justify-center items-center bg-white w-full hide-scrollbar h-screen z-50"> <Toaster/>
       <div className=" top-0 left-0  rounded-xl max-600px:h-screen h-[96vh] overflow-x-hidden overflow-y-scroll hide-scrollbar bg-white max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]  border-2 z-50">
          {/* header */}
          <div className="h-12 fixed bg-white  w-full flex items-center">
           <FaArrowLeftLong  onClick={()=>setEditOpen.setEditOpen(false)} className="ml-4 mt-3 cursor-pointer" size={22}/>
           <p className="text-[1rem] font-semibold ml-4 mt-2">Edit profile</p>
          </div>

          <div className="flex flex-col items-center w-full mt-20 ">
                <div className="flex flex-col items-center">
                   {user?.image?<img className="border-2 border-black h-20 w-20 rounded-full" src={`http://localhost:8000/${user?.image}`}  />:<FaRegUserCircle size={70}/>}
                   <input  onChange={handlesetimage} type="file" id="image" className="hidden"/>
                   <label htmlFor="image">
                      <p className="text-[80%] cursor-pointer text-[#6495f1] font-bold w-full text-center mt-2">Edit picture or avatar</p>
                   </label>
                </div>
                <div className="w-[90%] border-b border-black mt-8">
                  <p className="text-[80%] text-gray-500">Name</p>
                  <input value={name} onChange={(e)=>setname(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <div className="w-[90%] border-b border-black mt-6">
                  <p className="text-[80%] text-gray-500">Username</p>
                  <input value={username} onChange={(e)=>setusername(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <div className="w-[90%] border-b border-black mt-6">
                  <p className="text-[80%] text-gray-500">Bio</p>
                  <input value={bio} onChange={(e)=>setbio(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <div className="w-[90%] border-b border-black mt-6">
                  <p className="text-[80%] text-gray-500">Gender</p>
                  <input value={gender} onChange={(e)=>setgender(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <div className="w-[90%] border-b border-black mt-6">
                  <p className="text-[80%] text-gray-500">E-mail Address</p>
                  <input value={email} readOnly onChange={(e)=>setemail(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <div className="w-[90%] border-b border-black mt-6">
                  <p className="text-[80%] text-gray-500">Phone Number</p>
                  <input value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)} className="w-full outline-none "  type="text" />
                </div>
                <button onClick={handlesubmit} className="mt-8 h-8 w-[70%] rounded-md border bg-blue-400 text-white hover:bg-blue-500">Submit</button>
          </div>
       </div>
   </div>
  )
}

export default EditProfile