import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    initialState:{  
        messages:[],
    },

    reducers:{

        //Fetching All COnversation and update
        setMessage:(state, action)=>{
            state.messages = action.payload
        }
    }
    
})

export const {setMessage} = messageSlice.actions

export default messageSlice.reducer