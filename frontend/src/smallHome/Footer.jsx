import { FaInstagram } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

const Footer = (setfooterOpen) => {
  const {user}=useSelector(state=>state.user)
  return (
    <div className="fixed bottom-4  bg-white w-full h-11 flex gap-12 600px:gap-8 justify-center z-50 items-center">
      <GoHomeFill className="cursor-pointer" onClick={()=>{setfooterOpen.setfooterOpen(0);setfooterOpen.setmessageDrawer(false);setfooterOpen.sernotificationDrawerOper(false)}} size={28} />
      <IoSearch className="cursor-pointer" onClick={()=>{setfooterOpen.setfooterOpen(2);setfooterOpen.setmessageDrawer(false);setfooterOpen.sernotificationDrawerOper(false)}} size={28} />
      <p className="rounded-md border-2 cursor-pointer border-black">
        <IoAdd size={22} />
      </p>
      <FaInstagram className="cursor-pointer" size={28} />
      <img
        className="w-7 h-7 rounded-full cursor-pointer"
        onClick={()=>{setfooterOpen.setfooterOpen(5);setfooterOpen.setmessageDrawer(false);setfooterOpen.sernotificationDrawerOper(false)}}
        src={`http://localhost:8000/${user?.image}`}
      />
    </div> 
  );
};

export default Footer;
