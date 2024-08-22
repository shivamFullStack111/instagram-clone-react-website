import { RxCross1 } from "react-icons/rx"
import { FaRegHeart } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { PiTelegramLogoBold } from "react-icons/pi";
import { HiOutlineSave } from "react-icons/hi";

const SuggestedPost = () => {
  return (
    <div className="w-full bg-white mt-4 mb-4">
        <div className="flex justify-between items-center p-2">
            <p className="text-[15px] font-semibold">Suggested for you</p>
            <RxCross1 className="text-bold " size={15}/>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdResMi5U9eBEZpALYSqkuIEQ12a5Zo4dV2Q&s" className="w-full h-[570px]" />
        <div className="flex p-3 pl-5 pr-5 justify-between">
          <div className="flex text-[24px] gap-4">
            <FaRegHeart/>
            <BiMessageRounded size={26}/>
            <PiTelegramLogoBold  />
          </div>
          <HiOutlineSave size={25}/>
        </div>
          <p className="pl-4 text-sm font-bold">2,343,987 likes</p>
          <p className="pl-4 text-sm  mt-1 text-[90%]">Lorem ipsum dolor sit amet consectetur adipisicing evening elit.... more</p>
          <p className="pl-4 text-sm  mt-1 text-[85%] text-gray-500 cursor-pointer">View all 32,973 comments</p>
          <p className="pl-4 text-sm  text-[82%] text-gray-500 cursor-pointer">Feburary 18</p>
    </div>
  )
}

export default SuggestedPost