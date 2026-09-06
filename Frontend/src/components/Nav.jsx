import { MessageSquare } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {setMessage} from "../redux/store/messageSlice.js"



function Nav() {
const dispatch = useDispatch()
const {selectedConversation} = useSelector((state)=>state.conversation)
const {messages} = useSelector((state)=>state.message)






  return (
    <>
    {selectedConversation &&  
    <div className="">
        <div className="">
            <MessageSquare/>
        </div>
        <div className="">
            {selectedConversation?.title || "New Chat"}
        </div>

    </div>
    }
   
    </>
  )
}

export default Nav