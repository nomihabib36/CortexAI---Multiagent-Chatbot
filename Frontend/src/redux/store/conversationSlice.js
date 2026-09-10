import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",

    initialState:{  
        conversations:[],
        selectedConversation: null,
    },

    reducers:{

        //Fetching All COnversation and update
        setConversation:(state, action)=>{
            state.conversations = action.payload
        },
        //Only add new Conv in existing data
        addConversation:(state, action)=>{
            state.conversations.unshift(action.payload)
        },
        //filter selected Conv
        setSelectedConversation:(state, action)=>{
            state.selectedConversation = action.payload
        },
        setConvTitle:(state, action)=>{
            const {title, conversationId} = action.payload
            state.conversations = state.conversations.map((conv)=>(
                conv._id==conversationId?(
                    {...conv,title}
                ):conv
            ))

            if(state.selectedConversation?._id==conversationId){
                state.selectedConversation={...state.selectedConversation,title}
            }
        }
    }
    
})

export const {setConversation, addConversation, setSelectedConversation,setConvTitle} = conversationSlice.actions

export default conversationSlice.reducer