import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    initialState:{  
        messages:[],
        artifacts:[]
    },

    reducers:{

        //Fetching All COnversation and update
        setMessage:(state, action)=>{
            state.messages = action.payload
        },
        addMessage:(state, action)=>{
            state.messages.push(action.payload)
        },
        setArtifacts:(state, action)=>{
            state.artifacts = action.payload
        }
    }
    
})

export const {setMessage, addMessage, setArtifacts} = messageSlice.actions

export default messageSlice.reducer