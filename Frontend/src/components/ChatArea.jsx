import React from 'react'
import Nav from './Nav.jsx'
import MessageList from './MessageList.jsx'
import ChatInput from './ChatInput.jsx'

function ChatArea() {
  return (
    <div className='flex flex-1 flex-col'>
        
        <Nav/>
        <MessageList/>
        <ChatInput/>
    </div>
  )
}

export default ChatArea