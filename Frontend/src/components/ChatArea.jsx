import { useEffect } from 'react'
import Nav from './Nav.jsx'
import MessageList from './MessageList.jsx'
import ChatInput from './ChatInput.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {setConversation} from '../redux/store/conversationSlice.js'
import {setArtifacts, setMessage} from '../redux/store/messageSlice.js'
import { getMessage } from '../features/getMessages.js'

function ChatArea() {

const dispatch = useDispatch()
const {selectedConversation} = useSelector(state=> state.conversation)
 
useEffect(()=>{
 const getMsgs = async()=>{
   
   
   
   if(selectedConversation){
     if(selectedConversation.title=="New Chat") return;
     const data = await getMessage(selectedConversation?._id)
     dispatch(setMessage(data))
     const latestArtifactMessage =[...data].reverse().find(msg=> msg.artifacts && msg.artifacts.length > 0)
     dispatch(setArtifacts(latestArtifactMessage?.artifacts || []))
     
    
    

  }
  
 }
 getMsgs()
},[selectedConversation?._id])

  return (
    <div className='min-w-0 flex flex-1 flex-col'>
        
        <Nav/>
        <MessageList/>
        <ChatInput/>
    </div>
  )
}

export default ChatArea