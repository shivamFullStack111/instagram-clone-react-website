import { Toaster } from "react-hot-toast";
import StoryHeader from "./smallHome/StoryHeader";
import SuggestProfile from "./smallHome/SuggestProfile";
import SuggestedPost from "./smallHome/SuggestedPost";
import MessagesDrawer from "./smallHome/MessagesDrawer";
import { useEffect, useState } from "react";
import Footer from "./smallHome/Footer";
import ProfileDrawer from "./smallHome/ProfileDrawer";
import SearchDrawer from "./smallHome/SearchDrawer";
import NotificationDrawer from "./smallHome/notificationDrawer";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import { setactiveUsers, setallconversations } from "./store/Slices/chatSlice";
import axios from "axios";


const Home = () => {
  const [messageDrawer, setmessageDrawer] = useState(false)
  const [footerOpen, setfooterOpen] = useState(0)
  const [isposting,setisposting] = useState(false)
  const [notificationDrawerOper,sernotificationDrawerOper] = useState(false)
  const {user }=useSelector(state=>state.user)
  const [socket, setsocket] = useState(null)
  const [chatopen,setChatopen]=useState(false)
  const {toggle}=useSelector(state=>state.chat)

  const dispatch = useDispatch()

  useEffect(()=>{
    const getconversations = async()=>{
      console.log('toggle :-',toggle)
      if(user){
        const res = await axios.post('http://localhost:8000/get-conversation',{userid:user._id})
        dispatch(setallconversations(res.data.conversations || []))
      }
    }
    getconversations()
  },[user._id,user,toggle])

  useEffect(()=>{
    if(user){
      const socket = io('http://localhost:1000')
      setsocket(socket)
      socket.on('activeUsers',(activeUsers)=>{
        dispatch(setactiveUsers(activeUsers))
        console.log('activeusers    uh-    ----',activeUsers)
      })
    }
  },[user])

  useEffect(()=>{
    if(user&&socket){
      socket.emit('addUser',user) 
    }
  },[socket,user])

  return (
    <div className="flex justify-center overflow-x-hidden  items-center  w-full min-h-screen">     {messageDrawer&&<MessagesDrawer chatopen={chatopen} setChatopen={setChatopen} socket={socket}   setmessageDrawer={setmessageDrawer}/>} {footerOpen==5&&<ProfileDrawer setfooterOpen={setfooterOpen} isposting={isposting} setisposting={setisposting} />} {footerOpen==2&&<SearchDrawer setfooterOpen={setfooterOpen} />}{notificationDrawerOper&&<NotificationDrawer sernotificationDrawerOper={sernotificationDrawerOper}/>}
      {" "}
      <Toaster></Toaster>
      <div className="h-[95vh] overflow-y-scroll  hide-scrollbar max-600px:h-screen bg-[#f0eeee] max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px] border-2 b rounded-2xl">
        <StoryHeader setmessageDrawer={setmessageDrawer} sernotificationDrawerOper={sernotificationDrawerOper}/>
        {/* profile suggestions */}
        <p className="text-[14px] font-semibold m-2">Suggested for you</p>
        <div className="flex overflow-x-scroll scroll-smooth hide-scrollbar gap-2 pb-2 pl-2">
          <SuggestProfile />
          <SuggestProfile />
          <SuggestProfile /> {/* map here  */}
        </div>
        {/* suggested posts  map here*/}
        <div className="bg-white">
          <SuggestedPost />
          <SuggestedPost />
        </div>
      </div>
          {!chatopen&&!isposting && <Footer setmessageDrawer={setmessageDrawer} setfooterOpen={setfooterOpen}  sernotificationDrawerOper={sernotificationDrawerOper}/>}
    </div>
  );
};

export default Home;
