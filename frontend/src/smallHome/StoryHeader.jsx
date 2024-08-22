import { AiOutlineMessage } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const StoryHeader = (setmessageDrawer) => {

  return (
    <>
       <div className="flex bg-white p-1 pt-0 h-16 justify-between items-center">
          <div className="w-24">
            <img
            onClick={()=>{
              Cookies.remove('login_token')
              window.location.reload()
            }}
              className="cursor-pointer"
              src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
              alt=""
            />
          </div>
          <div className="flex w-[20%] gap-5 pb-1">
            <FaRegHeart size={23} onClick={()=>setmessageDrawer.sernotificationDrawerOper(true)} className='cursor-pointer' />
            <AiOutlineMessage className='cursor-pointer' onClick={()=>setmessageDrawer.setmessageDrawer(true)} size={23} />
          </div>
        </div>
        {/* stories */}
        <div className="flex bg-white overflow-y-hidden hide-scrollbar  overflow-x-scroll transition-opacity pb-2 gap-6 600px:gap-3 pl-4">
            {/* map frpm here stories */}
            <SingleStory/>
        </div>

        {/* messages drawer */}
        
    </>
  )
}

export default StoryHeader



const SingleStory = () => {
  const {user}=useSelector(state=>state.user)

  return (
    <div className="min-w-16 h-28 relative">
      <img  className="rounded-full h-16 w-16"  src={`http://localhost:8000/${user?.image}`}  alt="Your Story"/>
      <div className="absolute top-[2.6rem] left-[2.3rem] inset-0 rounded-full bg-blue-400 h-6 w-6 border border-white flex items-center justify-center text-white">   + </div>
      <p className="text-[11px] ml-3 mt-2">Your Story</p>
   </div>
  )
}

