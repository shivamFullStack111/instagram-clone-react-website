


import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {  useSelector } from "react-redux";
import isauthenticatedd from "../store/Controllers/userController";
import { calculateTimeAgo } from "../assets/utils/calculatetime";

const NotificationDrawer = ( props ) => {
     const {user}=useSelector(state=>state.user)
     const [allnotifications,setallnotifications]=useState([])
     
     useEffect(()=>{
        const getNotificationOfUser=async()=>{
            if(user){
              const res = await axios.post('http://localhost:8000/getNotificationsofuser',{userid:user._id,type:'friendrequest'})
              if(res?.data?.notifications) setallnotifications(res?.data?.notifications)
            }
        }
        getNotificationOfUser()
     },[user])

     const acceptFriendRequest = async (notification)=>{
      await axios.post('http://localhost:8000/acceptrequest',notification)
     }

  return (
   <div className="flex absolute justify-center items-center bg-white w-full h-screen z-50">
       <div className=" top-0 left-0  rounded-xl max-600px:h-screen h-[96vh] overflow-y-scroll hide-scrollbar bg-white max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]  border-2 z-50">
                 {/* header */}
          <div className="h-12  bg-white  w-full flex items-center justify-between pr-3">
           <div className="flex gap-3">
              <FaArrowLeftLong  onClick={()=>props.sernotificationDrawerOper(false)} className="ml-4 mt-3 cursor-pointer" size={22}/>
              <p className="text-[1rem] font-semibold ml-4 mt-2">Notifications</p>
           </div>
           <p className="cursor-pointer text-blue-400 font-semibold">Filter</p>
          </div>

         <div className="w-full mt-4 flex flex-col items-center gap-3">
           {allnotifications&&allnotifications.map((notification)=>(
             <Conversation acceptFriendRequest={acceptFriendRequest} notification={notification} key={notification._id}/>
           ))}
         </div>
       
       </div>
   </div>
  )
}

export default NotificationDrawer

const Conversation = ({notification,acceptFriendRequest}) => {
  const {user}=useSelector(state=>state.user)
  const [isalreadyFriend,sertisalreadyFriend]=useState(false)
  const [sender,setsender]=useState(null)

useEffect(()=>{
  const getsender = async()=>{
     const res = await axios.get(`http://localhost:8000/getuser/${notification?.senderid}`)
     setsender(res.data.user)
  }
  getsender()
},[notification])

useEffect(()=>{
   if(user){
    const isInuserFriend = user.friends.find((friendid)=>friendid==notification.senderid)
    if(isInuserFriend) sertisalreadyFriend(true)
   }
},[user,notification])

  return <>
       <div onClick={()=>acceptFriendRequest(notification)} className="w-[95%] h-14 rounded-md flex items-center">
            <img src={`http://localhost:8000/${sender?.image}`} className="w-14 h-12 rounded-full"/>
            <div className="ml-2 w-full flex">
              <div>
                <p className="text-xs text-gray-800">{sender?.username} <span className="text-sm text-gray-500 ml-1">send you friend request</span></p>
                <p className="text-[12px] text-gray-500">{calculateTimeAgo(notification?.createdAt)}</p>
              </div>
             {!isalreadyFriend?<button onClick={()=>{acceptFriendRequest(notification);sertisalreadyFriend(true);isauthenticatedd()}} className="text-sm text-white bg-blue-500 h-7 rounded-md ml-auto w-16">Accept</button>:<button className="text-sm border h-7 rounded-md ml-auto w-16">Friend</button>}
            </div>
       </div>
  </>
}