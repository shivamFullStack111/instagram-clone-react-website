import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setOponent,
  setconversation,
  settoggle,
} from "../store/Slices/chatSlice";
import { calculateElapsedTime } from "./utils/TimeFunction";
import { motion } from "framer-motion";
import { BiSolidImageAdd } from "react-icons/bi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import toast , {Toaster}  from 'react-hot-toast'

const MessagesDrawer = (setmessageDrawer) => {
  const { user } = useSelector((state) => state.user);
  const [friendUsers, setfriendUsers] = useState([]);

  // get friends of user
  useEffect(() => {
    const getFriendsOfUser = async () => {
      if (user) {
        const res = await axios.post("http://localhost:8000/getfriendsofuser", {
          user: user,
        });
        setfriendUsers(res.data.users || []);
      }
    };
    getFriendsOfUser();
  }, [user]);

  return (
    <div className="flex absolute justify-center items-center bg-white w-full h-screen z-50">
      <div className=" top-0 left-0  rounded-xl max-600px:h-screen h-[96vh] overflow-y-scroll hide-scrollbar bg-white max-600px:rounded-none max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]  z-50">
        {/* header */}
        <div className="h-12  bg-white  w-full flex items-center">
          <FaArrowLeftLong
            onClick={() => setmessageDrawer.setmessageDrawer(false)}
            className="ml-4 mt-3"
            size={22}
          />
          <p className="text-[1rem] font-semibold ml-4 mt-2">
            shvam12340987@gmail.com
          </p>
        </div>
        {/* search */}
        <div className="w-full mt-2 justify-center flex ">
          <div className="bg-[#f0eeee] w-[95%] mt-3  border-2 h-8 rounded-xl flex items-center">
            <IoSearch className="ml-2 text-[110%] " />
            <input
              className="w-full h-full bg-[#f0eeee] outline-none pl-2"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* notes */}
        <div className="flex overflow-x-scroll scroll-smooth hide-scrollbar mt-8">
          <div className=" min-w-28 h-28 flex flex-col items-center">
            <img
              className="rounded-full h-20 w-20"
              src={`http://localhost:8000/${user?.image}`}
            />
            <p className="text-gray-500 text-[12px]">Your note</p>
          </div>
        </div>

        <div className="flex justify-between mt-2 pl-3 pr-3">
          <p className="text-[1rem] font-semibold">Messages</p>
          <p className="text-[1rem] text-blue-500 font-semibold">Requests</p>
        </div>

        <div className="w-full mt-4 flex flex-col items-center gap-3">
          {friendUsers &&
            friendUsers.map((user) => (
              <Conversation
                socket={setmessageDrawer.socket}
                chatopen={setmessageDrawer.chatopen}
                setChatopen={setmessageDrawer.setChatopen}
                frienduser={user}
                key={user._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesDrawer;

const Conversation = ({ frienduser, chatopen, setChatopen, socket }) => {
  const [isactive, setisactive] = useState(false);
  const { activeUsers, oponent, allconversations } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [converstion, setconverstion] = useState(null);
  const [numberOfNotification, setnumberOfNotification] = useState(null);
  const [toggleForNotification, settoggleForNotification] = useState(false);
  const { toggle } = useSelector((state) => state.chat);

  // is user active
  useEffect(() => {
    const isactivee = activeUsers?.find((userr) => userr._id == frienduser._id);
    if (isactivee) {
      setisactive(true);
    } else {
      setisactive(false);
    }
  }, [activeUsers, frienduser, oponent]);

  // finding specific conversation of conversation loop friends
  useEffect(() => {
    if (allconversations.length > 0) {
      const convrstion = allconversations.find((conversation) => {
        return (
          conversation.members.includes(user._id) &&
          conversation.members.includes(frienduser._id)
        );
      });
      setconverstion(convrstion);
    }
  }, [allconversations, user]);

  // toggle when receive message fron socket
  useEffect(() => {
    if (socket) {
      socket.on("messageTOFrontend", (message) => {
        dispatch(settoggle());
      });
    }
  }, [socket]);

  //  fonding number of notification
  useEffect(() => {
    if (converstion && frienduser) {
      const notification = converstion.notificationdata.find(
        (ntify) => ntify.userid === user._id
      );
      setnumberOfNotification(notification.numberofnotification);
    }
  }, [converstion, frienduser, toggle, toggleForNotification]);

  // onclick create conversation
  const handleClick = async (frienduser) => {
    const res = await axios.post("http://localhost:8000/create-conversation", {
      user1: user,
      user2: frienduser,
    });
    dispatch(setOponent(frienduser));
    dispatch(setconversation(res?.data?.conversation));
    setChatopen(true);
  };

  return (
    <>
      {chatopen && (
        <ChatingPage socket={socket} setChatopen={setChatopen}></ChatingPage>
      )}
      <div
        onClick={() => handleClick(frienduser)}
        className="w-[95%] h-16 rounded-md cursor-pointer flex items-center"
      >
        <img
          src={`http://localhost:8000/${frienduser?.image}`}
          className="w-14 h-14 rounded-full"
        />
        <div className="ml-3 ">
          <p className="text-sm text-gray-800 flex items-center">
            {frienduser?.username}{" "}
            {isactive && (
              <span className="h-2 w-2 rounded-full ml-3 bg-green-500"></span>
            )}
          </p>
          {numberOfNotification > 0 ? (
            <div className="   text-green-500 flex justify-center items-center text-[13px]  gap-1">
              {numberOfNotification}
              <span> New Messages...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{converstion?.lastmessage}</p>
          )}
        </div>
        <MdOutlinePhotoCamera size={25} className="ml-auto text-gray-600" />
      </div>
    </>
  );
};

const ChatingPage = ({ setChatopen, socket }) => {
  const { oponent, conversation, activeUsers } = useSelector(
    (state) => state.chat
  );
  const [inputValue, setInputValue] = useState("");
  const { user } = useSelector((state) => state.user);
  const [allmessages, setallmessages] = useState([]);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const [selectFileOpen, setselectFileOpen] = useState(true);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allmessages]);

  // get messages and also for clear notifications
  useEffect(() => {
    const getmessages = async () => {
      if (conversation) {
        const res = await axios.post("http://localhost:8000/get-messages", {
          conversationid: conversation._id,
          userid: user._id,
        });
        setallmessages(res?.data?.messages || []);
        dispatch(settoggle());
      }
    };
    getmessages();
  }, [conversation]);

  // receiver message from socket
  useEffect(() => {
    if (socket) {
      socket.on("messageTOFrontend", (message) => {
        setallmessages([...allmessages, message]);
        dispatch(settoggle());
      });
    }
  }, [socket, allmessages]);

  useEffect(() =>{
     console.log(allmessages)
  },[allmessages]);

  //send message
  useEffect(() => {
    const handleSendMessaeg = async () => {
      const message = {
        conversationid: conversation._id,
        message: inputValue,
        senderid: user._id,
        receiverid: oponent._id,
        type: "text",
        isgroupchat: false,
      };
      const res = await axios.post(
        "http://localhost:8000/create-message",
        message
      );
      socket.emit("message", message);
      setallmessages([...allmessages, message]);
      setInputValue("");
      dispatch(settoggle());
    };
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && inputValue !== "") {
        handleSendMessaeg();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputValue, conversation._id, oponent._id, user._id]);

  const handleSendImage = () => {
    const message = {
      conversationid: conversation._id,
      message: inputValue,
      senderid: user._id,
      receiverid: oponent._id,
      type: "image",
      isgroupchat: false,
    };
  };

  const handleSendVideo = async (e) => {
    const formdata = new FormData();

    formdata.append("video", e.target.files[0]);
    formdata.append("senderid", user._id);
    formdata.append("receiverid", oponent._id);
    formdata.append("type", "video");
    formdata.append("isgroupchat", false);
    formdata.append('conversationid',conversation._id)

    const res = await axios.post(
      "http://localhost:8000/create-message-video",
      formdata,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    setselectFileOpen(prev=>!prev)
    console.log(res.data.message)
    setallmessages([...allmessages, res.data.message]);
    socket.emit("message", {...res?.data?.message,message:'video'});
    
    setselectFileOpen(true)
    if (res.data.success) {
      toast.success(res.data.messagee);
      
    } else {
      toast.error(res.data.messagee);
    }
  };

  return (
    <>
      {" "}
      <Toaster />
      <div className="flex absolute top-0 max-600px:h-screen  justify-center items-center bg-white w-full h-screen z-50">
        <div
          ref={chatContainerRef}
          className=" top-0 left-0   max-400px:h-screen h-[82vh] overflow-y-scroll hide-scrollbar bg-white  max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px] border-b-0  border-2 z-50"
        >
          {/* header */}
          <div className="h-[7%] z-30 bg-white  max-400px:min-w-full max-400px:max-w-full min-w-[366px] max-w-[366px] shadow-sm fixed  flex items-center">
            <FaArrowLeftLong
              onClick={() => {
                setChatopen(false);
                dispatch(setOponent(null));
                dispatch(setconversation(null));
              }}
              className="ml-4 mt-3 cursor-pointer"
              size={22}
            />
            <div className="text-[1rem]  flex items-center ml-4 mt-2 ">
              <img
                className="h-10   w-10 rounded-full "
                src={`http://localhost:8000/${oponent?.image}`}
              />
              <div className="ml-2">
                <p className="text-semibold">{oponent?.name}</p>
                <p className="text-[11px] text-gray-500">{oponent?.username}</p>
              </div>
            </div>
          </div>
          {/* body */}
          <div className="w-full pb-10  flex flex-col rounded-xl  items-center overflow-y-scroll hide-scrollbar min-h-[90%] top-5 mt-[5rem]">
            {allmessages.map((message, i) =>
             message.type==='text' ? message.senderid !== user._id  ? (
                <div className="w-full gap-2 p-2 flex items-center" key={i}>
                  <img
                    className="h-7 w-7 mt-auto rounded-full"
                    src={`http://localhost:8000/${oponent.image}`}
                  />
                  <div className="rounded-xl max-w-[55%] p-[0.2rem] pl-3 pr-3 text-[0.94rem] bg-[#f4f2f2]">
                    {message.message}
                    <p className="mt-1 text-[0.8rem] text-gray-500">
                      {calculateElapsedTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full gap-2 mt-[0.19rem]  flex justify-end items-center"
                  key={i}
                >
                  <div className="rounded-xl pt-[0.34rem] pb-[0.34rem] max-w-[55%]  pl-3 pr-3 text-[0.94rem] text-white bg-[#2896f1]">
                    {message.message}{" "}
                    <p className="text-[11px] text-gray-200">
                      {calculateElapsedTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ):message.type=='video'&&<div className={`flex  ${message.senderid!==user._id?'items-start':'items-end'}  flex-col p-2  w-ful h-min `}>
                    <video className={`max-w-[70%] ${message.senderid!==user._id&&'border-gray-400'} border-8 rounded-xl border-blue-500 h-full`} controls src={message.url}></video>
              </div>
            )}
            <div className="flex justify-center">
              <div className="flex fixed bottom-2 600px:bottom-6 items-center h-20 p-1 bg-white justify-center border-2 border-t-0 rounded-b-xl">
                <div className=" flex items-center h-12 max-400px:min-w-[95%] max-400px:max-w-[95%] min-w-[358px] max-w-[358px] bottom-2 600px:bottom-6 rounded-3xl bg-[#cbc8c8]">
                  <span className="p-2 text-3xl">@</span>{" "}
                  <input
                    className="h-full bg-[#cbc8c8] w-full outline-none"
                    type="text"
                    placeholder="Message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />{" "}
                  <motion.span
                    onClick={() => setselectFileOpen(prev=>!prev)}
                    animate={
                      !selectFileOpen
                        ? { rotate: -45}
                        : { rotate: 0}
                    }
                    initial={ { rotate: 0 }}
                    className="h-full w-[20%]  flex justify-center ml-3 cursor-pointer items-center font-bold text-3xl relative"
                  >
                    +{" "}
                  </motion.span>
                  {!selectFileOpen && <motion.span
                    initial={
                       { height: '0px' }
                    }
                    animate={
                      !selectFileOpen ? { height: "10rem" } : { height: '0px' }
                    }
                    className="absolute bg-blue-500 w-40 h-48  rounded-t-md bottom-16 right-6"
                  >
                    <motion.div
                      className={` flex flex-col gap-2 ${
                        !selectFileOpen ? "block" : "hidden"
                      } p-3 overflow-hidden `}
                      initial={{ opacity: 0 }}
                      animate={!selectFileOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.24 }}
                    >
                      <input
                        onChange={(e) => {
                          handleSendVideo(e);
                        }}
                        type="file"
                        id="send/file"
                        className="hidden"
                      />
                      <label htmlFor="send/file">
                        <p className="flex items-center gap-1 text-white cursor-pointer">
                          <BiSolidImageAdd size={25} /> image
                        </p>
                      </label>
                      <label htmlFor="send/file">
                        <p className="flex items-center gap-1 text-white cursor-pointer">
                          {" "}
                          <AiOutlineVideoCameraAdd size={25} />
                          video
                        </p>
                      </label>
                    </motion.div>
                  </motion.span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
