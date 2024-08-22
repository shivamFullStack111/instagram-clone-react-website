import { IoAdd } from "react-icons/io5"
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdGrid } from "react-icons/io";
import { TbUserSquareRounded } from "react-icons/tb";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import {motion} from 'framer-motion'

const ProfileDrawer = ( setfooterOpen  ) => {
  const {user}=useSelector(state=>state.user)
  const [active,setactive]=useState(1)
  const [editOpen,setEditOpen] = useState(false)
  const [allpostsofuser,setallpostsofuser] = useState([])

  useEffect(()=>{
     
        const getallpostofuser=async()=>{
          if(user){
            const res = await axios.get(`http://localhost:8000/getallpostsofuser/${user?._id}`)
            setallpostsofuser(res?.data?.posts || [])
          }
        }
      getallpostofuser()
  },[user])

  return (<>
   {setfooterOpen.isposting&&<Posting setisposting={setfooterOpen.setisposting} isposting={setfooterOpen.isposting}/>}
   <div className="flex absolute justify-center items-center bg-white w-full h-screen z-20"> 
       <div className=" top-0 left-0  rounded-xl max-600px:h-screen h-[90vh] overflow-y-scroll hide-scrollbar bg-white max-600px:rounded-none max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]  z-50">
    {/* header? */}
       <div className="h-12  bg-white shadow-sm items-center w-full flex justify-between pr-3">
           <p className="text-[1rem] 600px:text-sm font-semibold ml-4 mt-2">{user?.email}</p>
           <div className="flex items-center gap-3">
              <p onClick={()=>setfooterOpen.setisposting(true)} className="rounded-md border-2 h-min cursor-pointer border-black">
                <IoAdd className="text-[1rem]" />
              </p>
                <IoReorderThreeOutline className="text-[1.8rem]"/>
           </div>
        </div>
    {/* profile bio */}
       <div className="flex items-center m-2 pt-4 pb-4 pl-3 pr-3 600px:gap-5 600px:text-[80%]">
          <div>
            <img className="h-20 w-20 600px:h-16 600px:w-16 rounded-full" src={`http://localhost:8000/${user?.image}`}  />
            <p className="600px:text-sm text-sm 600px:w-[140%] mt-2 text-gray-600">{user?.name}</p>
            <p className="text-xs text-gray-300">{user?.bio}</p>
          </div>
          <div className="flex flex-col items-center ml-3  600px:ml-2 mb-5">
            <p className="text-[100%] text-bold">{allpostsofuser?.length}</p>
            <p className="text-[80%]">posts</p>
          </div>
          <div className="flex flex-col items-center ml-10 600px:ml-6  mb-5">
            <p className="text-[100%] text-bold">{user?.friends?.length}</p>
            <p className="text-[80%]">friends</p>
          </div>
          {/* <div className="flex flex-col items-center ml-10 600px:ml-6  mb-5">
            <p className="text-[100%] text-bold">{user?.following?.length || 0}</p>
            <p className="text-[80%]">followings</p>
          </div> */}
       </div>
        <div className="flex justify-evenly">
           <button className="text-sm w-[45%] p-1 rounded-md bg-[#f0eeee]" onClick={()=>setEditOpen(true)}>Edit profile</button>
           <button className="text-sm w-[45%] p-1 rounded-md bg-[#f0eeee]">Share profile</button>
        </div>
        <div className="flex mt-7 ">
          <p className={`border-b ${active==1&&"border-black"} pb-2 w-[50%] flex justify-center`} onClick={()=>setactive(1)}><IoMdGrid size={25}/></p>
          <p className={`border-b ${active==2&&"border-black"} pb-2 w-[50%] flex justify-center`} onClick={()=>setactive(2)}><TbUserSquareRounded size={25}/></p>
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
   </div>
  {editOpen&& <EditProfile setEditOpen={setEditOpen}/>}
  </>
  )
}

export default ProfileDrawer

import { MdOutlineGridOn } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const Posting =(props)=>{
  const {user}=useSelector(state=>state.user)
  const [postOpen,setpostOpen]=useState(false)
  const [postImage, setpostImage] = useState(null)
  const [lastPageOfPost, setlastPageOfPost] = useState(false)
  const [captionvalue, setcaptionvalue] = useState('')

  const handlesubmit = async() =>{
    const formdata = new FormData
    formdata.append('file',postImage)
    formdata.append('caption',captionvalue)
    formdata.append('user',JSON.stringify(user))

     const res =await axios.post('http://localhost:8000/createpost',formdata)
     if(res?.data?.success) toast.success(res.data.message)
     else toast.error(res.data.message)
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
    console.log('user ;- ',user)
  const handleimagechange=(e)=>{
      setpostImage(e.target.files[0])
  }

  return <>

   <motion.div className="flex absolute justify-center  items-center  w-full h-[100vh] z-40"> 
       <div onClick={()=>props.setisposting(false)} className=" top-0 left-0 flex items-end rounded-xl max-600px:h-screen h-[96vh]  overflow-y-scroll hide-scrollbar bg-[#00000075] w-[21vw] max-600px:w-full  border-2 z-50">
          <motion.div initial={{y:1400}} animate={props.isposting?{y:0}:{y:1400}} transition={{duration:0.3}} onClick={(e)=>e.stopPropagation()} className=" h-[60vh] rounded-xl bg-white w-full">
             <p className="w-full cursor-pointer text-center font-bold text-inherit mt-7 border-b border-gray-300 pb-2">Create</p>
             <motion.p onClick={()=>setpostOpen(true)}  whileTap={{backgroundColor:'#2120202d'}}   className="w-full  font-semibold text-inherit h-13 p-3 border-b  border-gray-300  flex items-center gap-2"><MdOutlineGridOn size={25}/> <span>Post</span></motion.p>
          </motion.div>
       </div>
   </motion.div>

  {postOpen&&
   <div className="flex absolute justify-center  items-center  w-full h-[100vh] z-50">  <Toaster />
       <div  className=" top-0 left-0 flex flex-col rounded-xl max-600px:h-screen h-[96vh]  overflow-y-scroll hide-scrollbar bg-white w-[21vw] max-600px:w-full  border-2 z-50">
          <div className="flex justify-between shadow-sm items-center h-min w-full p-3">
             <RxCross1 className="cursor-pointer" onClick={()=>{setpostOpen(false);props.setisposting(false)}} size={23}/>
             <p onClick={()=>{if(!postImage) {toast.error('please select image')} else setlastPageOfPost(true)}} className="font-semibold cursor-pointer text-blue-400 ">Next</p>
          </div>
          <div className="w-full h-[70vh] p-2  border-b-2 border-gray-300">
            {postImage?<img className="w-full rounded-md h-full" src={URL.createObjectURL(postImage)} />:<p className="w-full h-full text-4xl font-semibold text-gray-400 flex justify-center items-center">Select an image</p>}
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div >
             <input onChange={handleimagechange} type="file" id="post" className="hidden" />
              <label htmlFor="post">
                <img  className="h-24 cursor-pointer" src="https://t3.ftcdn.net/jpg/04/28/36/88/360_F_428368831_UVan10UgxCCnYgJgFMNoV2xGy7pO8utS.jpg" />
              </label>
            </div>
          </div>
       </div>
   </div>}

   {lastPageOfPost&&<div className="flex absolute justify-center  items-center  w-full h-[100vh] z-50"> 
       <div  className=" top-0 left-0 flex flex-col rounded-xl max-600px:h-screen h-[96vh]  overflow-y-scroll hide-scrollbar bg-white w-[21vw] max-600px:w-full  border-2 z-50">
          <div className="flex gap-5 shadow-sm items-center h-min w-full p-3">
             <FaArrowLeftLong className="cursor-pointer" onClick={()=>{setlastPageOfPost(false)}} size={23}/>
             <p className="font-bold text-gray-700 ">New Post</p>
          </div>
          <div className="w-full flex justify-center mt-2">
             <img className="h-56 " src={URL.createObjectURL(postImage)} />
          </div>
          <div className="w-full p-3 border-b-2">
              <textarea onChange={(e)=>setcaptionvalue(e.target.value)} type="text" style={{resize:'none'}} rows={4} className="outline-none hide-scrollbar text-gray-700 w-full placeholder:text-sm placeholder:text-gray-300" placeholder="Write a caption" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold flex gap-2  mt-2 items-center"><CiLocationOn size={23}/>Tag people <span className="text-gray-400 text-sm font-normal">Comming soon...</span></p>
          </div>
          <div className="flex justify-center mt-auto mb-6">           
            <button onClick={handlesubmit} className="w-[90%] h-9 rounded-md text-white hover:bg-blue-600 bg-blue-500">Share</button>
          </div>
       </div>
   </div>}
  </>
}