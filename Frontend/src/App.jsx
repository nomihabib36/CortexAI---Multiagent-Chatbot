import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import {auth, googleprovider} from '../utils/firebase.js'

function App() {

  const googleLogin = async() =>{
    const data = await signInWithPopup(auth, googleprovider) 
    console.log(data);
     
  }
  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
        <button className='w-50 h-25 bg-white' onClick={googleLogin}>
          Continue With Google
          </button>
    </div>
  )
}

export default App