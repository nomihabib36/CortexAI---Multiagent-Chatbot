import React, { useEffect, useState } from 'react'
import { PanelLeftIcon, PenSquare, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import  {getConversations} from '../features/getConversations.js'
import  {createConversation} from '../features/createConversation.js'
import  {addConversation, setConversation, setSelectedConversation} from '../redux/store/conversationSlice.js'

export default function Sidebar() {


  //sidebar state
const [collapsed, setCollapsed] = useState(false);

  
  //for fetching Data
  const dispatch = useDispatch()
  const {conversations, selectedConversation} = useSelector(state => state.conversation)
useEffect(()=>{
  const getConv = async () =>{
    const data = await getConversations()
    
    dispatch(setConversation(data))
    

  }
  getConv()
},[])

//create COnversation and handle
const handleCreateConv = async ()=>{
  const data = await createConversation()
  
  dispatch(addConversation(data))
}






  return (
    // Main container
    <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]'>

        <div className='flex flex-col h-full'>
                {/* Header */}
            <div className=' flex items-center gap-2.5 px-4 py-4 border-b border-white/ [0/06]'>
                      {/* Panel Icon */}
                <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white-[0.05] transition-colors duration-150 bg-transparent' 
                onClick={()=>setCollapsed(true)}
                >
                <PanelLeftIcon/>
                </div>
                      {/* App Title */}
                <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
                CortexAi
                </span>
                      {/* Subscription Status */}
                <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>
                free
                </span>
                    {/* newChat icon */}
                <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-color duration-150 bg-transparent border-none cursor-pointer ' >
                  <PenSquare size={14} onClick={handleCreateConv}/> 
                </button>

            </div>
                {/* New Chat button */}
          <div className='px-4 pt-4 pb-1'>
                  <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150 '>
                  <Plus size={15}/>
                  New Chat
                  </button>

          </div>
                {/* Conversation */}
                {conversations.length == 0 ? 
                //When No Conversation
                <div className='px-5 pt-4 pb-1.5 text=[10.5px] font-semibold uppercase tracking-widest text-slate-600'>

                    No Recent Conversation
                </div>
                :
                //When any Conversation
                (
                  
                  <div className='px-5 pt-4 pb-1.5 text=[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                Recents
          </div>
                )}

                {/* Conversation List UI*/}
                <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {conversations.map((conv, i)=>{

                      const isActive = selectedConversation?._id==conv?._id
                      return (

                        <div

                        //// Set the clicked conversation as the selected conversation 
                        onClick={()=>{
                          dispatch(setSelectedConversation(conv));
                        }}
                        className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-color duration-150 
                    ${isActive ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                    : "bg-transparent border-transparent bg-white"}`}>
                          
                        </div>
                      )
                    })}

                </div>     

        
        </div>
    </div>
  )
}
