import api from '../utils/axios.js'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import {auth, googleprovider} from '../utils/firebase.js'

function App() {
  const handleLogin = async (token)=>{
    try {
      const {data} = await api.post("/auth/login", {token})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  }


  const googleLogin = async() =>{
    const data = await signInWithPopup(auth, googleprovider)
    const token = await data.user.getIdToken()
    console.log(`google login token ${ token}`);
    await handleLogin(token)    
    console.log(`data = ${data}`);
    
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