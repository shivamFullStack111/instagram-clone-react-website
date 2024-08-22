
import { IoSearch } from "react-icons/io5";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from 'axios'
import { FaRegUserCircle } from "react-icons/fa";
import ProfileVisitDrawer from "./profileVisitDrawer";
import { settoggle } from "../store/Slices/chatSlice";

const SearchDrawer = (setfooterOpen) => {
  const [searchvalue, setsearchvalue] = useState('')
  const [users, setusers] = useState([])
  const [page, setpage] = useState(1)
  const [vistProfileOpen,setVisitProfileOpen] = useState(false)
  const [visitUser,setvisitUser]=useState(null)

  useEffect(()=>{
     const getsearchusers = async()=>{
      const res = await axios.post('http://localhost:8000/getusers',{searchvalue,page})
       setusers(res.data.users)
     }
      
     if(searchvalue){  
       getsearchusers()
     } if(!searchvalue){
      setusers([])
     }

  },[searchvalue])

  return (
    <>
    {visitUser&&vistProfileOpen&&<ProfileVisitDrawer visitUser={visitUser} setvisitUser={setvisitUser} setVisitProfileOpen={setVisitProfileOpen}/> }
      <div className="flex absolute justify-center items-center bg-white w-full h-screen z-20">
        <div className=" top-0 left-0  rounded-xl max-600px:h-screen h-[96vh] overflow-y-scroll hide-scrollbar bg-white max-600px:rounded-none max-400px:min-w-full max-400px:max-w-full min-w-[370px] max-w-[370px]  border-2 z-50">
          {/* header? */}
          <div className="h-12  bg-white shadow-sm items-center w-full  flex justify-center pr-3">
            <div className="flex p-1 rounded-md bg-[#f0eeee] ml-2 justify-center items-center w-[95%]">
              <IoSearch className="" size={21}/>
              <input onChange={(e)=>setsearchvalue(e.target.value)} className="w-full pl-1 bg-[#f0eeee] outline-none" type="text"/>
            </div>
          </div>
         <div className="w-full flex flex-col gap-2 items-center">
            {users&&users.map((user,i)=>(
            <div onClick={()=>{setvisitUser(user);setVisitProfileOpen(true)}} className="flex cursor-pointer items-center w-[91%] mt-2" key={innerHeight}>
               {user?.image?<img className="h-14 w-14 rounded-full" src={`http://localhost:8000/${user?.image&&user?.image}`}  />:<FaRegUserCircle size={60}/>}
               <div  className="ml-3">
                 <p>{user?.username}</p>
                 <p className="text-gray-500">{user?.name}</p>
               </div>
            </div>
           ))}
         </div>
        </div>
          <Footer   setfooterOpen={setfooterOpen.setfooterOpen}/>
      </div>
    </>
  );
};

export default SearchDrawer;

