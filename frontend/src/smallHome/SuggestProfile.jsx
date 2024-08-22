import { RxCross1 } from "react-icons/rx"

const SuggestProfile = () => {
  return (
             <div className="flex flex-col shadow-sm  items-center bg-white rounded-md h-60 min-w-48 ">
              <p className="w-full p-1 flex justify-end text-gray-500"><RxCross1 size={15}/></p>
              <img className="h-32 w-32 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJmFW_rzPyuJUmTEmTk9ZLB7u1CmTclyKCA&s" />
              <p className="mt-1 text-[13px] font-bold">Raman Chaudhary</p>
              <p className="text-[12px] text-gray-500 font-semibold mt-1">Suggested for you</p>
             </div>
  )
}

export default SuggestProfile