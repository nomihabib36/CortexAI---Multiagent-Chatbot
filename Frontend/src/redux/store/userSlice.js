import { createSlice } from "@reduxjs/toolkit"
    
const userSlice = createSlice({
    name: "user",

    //set initial user data
    initialState:{
        userData:null
    },

    //update user data into 'userData'
    reducers:{
        setUserData: (state, action)=>{
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer