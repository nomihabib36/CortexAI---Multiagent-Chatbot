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
    <div className="">
        {/* icon */}
        <div className="">
            <MessageSquare/>
        </div>
        {/* Title */}
        <div className="">
            {selectedConversation?.title || "New Chat"}
        </div>
        {/* Message Counter */}
        <div className="">
            
        </div>

    </div>
    }
   
    </>
  )
}

export default Nav