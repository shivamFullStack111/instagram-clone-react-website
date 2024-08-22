import { IoMdGrid } from "react-icons/io";
import {  TbUserSquareRounded } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiUserAddLine } from "react-icons/ri";
import Spinner from '../Spinner'

const ProfileVisitDrawer = ( setfooterOpen  ) => {
  const {user}=useSelector(state=>state.user)
  const [active,setactive]=useState(1)
  const [allpostsofuser,setallpostsofuser] = useState([])
  const [isRequestSend,setisRequestSend] = useState(false)
  const [isalreadyFriend,setisalreadyFriend] = useState(false)
  const [loading,setloading]=useState(true)

  const handleSendRequest = async()=>{
     await axios.post('http://localhost:8000/sendnotification',{senderid:user._id,receiverid:setfooterOpen.visitUser?._id,type:'friendrequest'})
       setisRequestSend(true)
    }

    useEffect(()=>{
      setloading(true)
      const isalrdyFriend = user.friends.find((friendid)=>
         friendid===setfooterOpen.visitUser._id
      )

      if(isalrdyFriend){
          setisalreadyFriend(true)
      }
      setloading(false)
    },[setfooterOpen.visitUser,user])

  useEffect(()=>{
    setloading(true)
     const isalreadyrequested =async()=>{
        if(user._id&&setfooterOpen.visitUser._id){
          const res = await axios.post('http://localhost:8000/getnotification',{senderid:user._id,receiverid:setfooterOpen.visitUser?._id,type:'friendrequest'})
          if(res.data.notification) setisRequestSend(true)
        }
     }
     isalreadyrequested()
     setloading(false)
  },[user,setfooterOpen.visitUser])

  const handleCancelRequest =async()=>{
     await axios.post('http://localhost:8000/cancelRequest',{senderid:user._id,receiverid:setfooterOpen.visitUser?._id,type:'friendrequest'})
     setisRequestSend(false)
  }

  useEffect(()=>{
    setloading(true)
        const getallpostofuser=async()=>{
          if(user){
            const res = await axios.get(`http://localhost:8000/getallpostsofuser/${setfooterOpen.visitUser?._id}`)
            setallpostsofuser(res?.data?.posts || [])
          }
        }
      getallpostofuser()
      setloading(false)
  },[setfooterOpen.visitUser?._id,user])

  return (<>
   {loading?<Spinner/>:<div className="flex absolute justify-center  items-center bg-white w-full h-screen z-30"> 
       <div className=" top-0 left-0  rounded-xl border-2 max-600px:h-screen h-[90vh] overflow-y-scroll hide-scrollbar max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]   z-50">
    {/* header? */}
       <div className="h-12  bg-white shadow-sm items-center w-full flex justify-between pr-3">
           
           <p className="text-[1rem] 600px:text-sm font-semibold ml-4 mt-2 flex items-center gap-3"><FaArrowLeftLong onClick={()=>{setfooterOpen.setvisitUser(false);setfooterOpen.setVisitProfileOpen(false)}} className="cursor-pointer"/> <p> {setfooterOpen.visitUser?.username}</p></p>
           <div className="flex items-center gap-3">
            :
           </div>
        </div>
    {/* profile bio */}
       <div className="flex items-center m-2 pt-4 pb-4 pl-3 pr-3 600px:gap-5 600px:text-[80%]">
          <div>
            <img className="h-20 w-20 600px:h-16 600px:w-16 rounded-full" src={`http://localhost:8000/${setfooterOpen.visitUser?.image}`}  />
            <p className="600px:text-sm text-sm 600px:w-[140%] mt-2 text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{setfooterOpen.visitUser?.bio}</p>
          </div>
          <div className="flex flex-col items-center ml-3  600px:ml-2 mb-5">
            <p className="text-[100%] text-bold">{allpostsofuser?.length}</p>
            <p className="text-[80%]">posts</p>
          </div>
          <div className="flex flex-col items-center ml-10 600px:ml-6  mb-5">
            <p className="text-[100%] text-bold">{setfooterOpen.visitUser?.friends?.length || 0}</p>
            <p className="text-[80%]">friends</p>
          </div>
          {/* <div className="flex flex-col items-center ml-10 600px:ml-6  mb-5">
            <p className="text-[100%] text-bold">{setfooterOpen.visitUser?.followings?.length || 0}</p>
            <p className="text-[80%]">followings</p>
          </div> */}
       </div>
        {user?.email!==setfooterOpen.visitUser?.email&&
            <div className="flex justify-evenly">
              {isalreadyFriend?<button onClick={handleCancelRequest} className="text-sm w-[43%] p-1 rounded-md bg-[#f0eeee]">Friend</button>:!isRequestSend?<button  className="text-sm w-[43%] p-1 rounded-md bg-blue-500 text-white" onClick={handleSendRequest}>Follow</button>:<button onClick={handleCancelRequest} className="text-sm w-[43%] p-1 rounded-md bg-[#f0eeee]">Requested</button>}
              {}
            <button className="text-sm w-[43%] p-1 rounded-md bg-[#f0eeee]">Message</button>
            <button><RiUserAddLine size={20}/></button>
         </div>
        }
        <div className="flex mt-7 ">
          <p className={`border-b ${active==1&&"border-black"} pb-2 w-[50%] flex justify-center cursor-pointer`} onClick={()=>setactive(1)}><IoMdGrid size={25}/></p>
          <p className={`border-b ${active==2&&"border-black"} pb-2 w-[50%] flex justify-center cursor-pointer`} onClick={()=>setactive(2)}><TbUserSquareRounded size={25}/></p>
        </div>
        {/* all posts map */}
        {active==1&&
           <div className="grid grid-cols-3">
            {allpostsofuser&&allpostsofuser.map((post)=>(
              <div className="border-2 h-36 w-full" key={post._id}>
                <img className="w-full h-full" src={`http://localhost:8000/${post.posturl}`} />
             </div>
            ))}
           </div>
        } 
       </div>
   </div>}
  </>
  )
}

export default ProfileVisitDrawer
