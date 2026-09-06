import { MessageSquare } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {setMessage} from "../redux/store/messageSlice.js"



function Nav() {
const dispatch = useDispatch()
const {selectedConversation} = useSelector((state)=>state.conversation)
const {messages} = useSelector((state)=>state.message)








  return (
    <>

    {/* if not selected any conv then not show conv detail or chat area */}
    {selectedConversation && 
    // Navbar 
    <div className='h-14 flex items-center gap-2.5 px-5 border-b border-white/[0.06] bg-[#0d0f14]'>
        {/* icon */}
        <div className='flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20'>
            <MessageSquare size={13} className="text-indigo-400"/>
        </div>
        {/* Title */}
        <div className="text-[14px] font-semibold text-slate-100 tracking-tight">
            {selectedConversation?.title || "New Chat"}
        </div>
        {/* Message Counter */}
        <div className="text-[10px] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06] px-3 py-0.5 rounded-full">
            {messages.length} Message
        </div>

    </div>
    }
   
    </>
  )
}

export default Nav