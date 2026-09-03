import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: conversations,

    initialState:{
        conversations:[],
        selectedConversation: null
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
        }
    }
    
})

export const {setConversation, addConversation, selectedConversation} = conversationSlice.actions

export default conversationSlice.reducer