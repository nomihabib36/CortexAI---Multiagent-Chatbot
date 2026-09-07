import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    initialState:{  
        messages:[]
    },

    reducers:{

        //Fetching All COnversation and update
        setMessage:(state, action)=>{
            state.messages = action.payload
        },
        addMessage:(state, action)=>{
            state.messages.push(action.payload)
        }
    }
    
})

export const {setMessage, addMessage} = messageSlice.actions

export default messageSlice.reducer