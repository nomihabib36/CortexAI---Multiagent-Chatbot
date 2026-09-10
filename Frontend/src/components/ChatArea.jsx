import { useEffect } from 'react'
import Nav from './Nav.jsx'
import MessageList from './MessageList.jsx'
import ChatInput from './ChatInput.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {setConversation} from '../redux/store/conversationSlice.js'
import {setMessage} from '../redux/store/messageSlice.js'
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
  
    
    

  }
  
 }
 getMsgs()
},[selectedConversation?._id])

  return (
    <div className='flex flex-1 flex-col'>
        
        <Nav/>
        <MessageList/>
        <ChatInput/>
    </div>
  )
}

export default ChatArea