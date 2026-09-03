import React, { useEffect } from "react"
import Home from "./pages/Home"
import getCurrentUser from "./features/getCurrentUser"
import {useDispatch} from 'react-redux'
import { setUserData } from "./redux/store/userSlice"
import Sidebar from "./components/SideBar"
function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    //fetch current user data in refresh
    const getUser = async () =>{
      const data = await getCurrentUser()
      
      // update user data from redux
      dispatch(setUserData(data))
    }
    getUser()
  },[]);
  

  return (
    <>
    <Home/>
   
    
    </>
  )
}

export default App