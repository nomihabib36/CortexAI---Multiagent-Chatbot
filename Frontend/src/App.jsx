import { useEffect } from "react"
import Home from "./pages/Home"
import getCurrentUser from "./features/getCurrentUser.js"
import {useDispatch} from 'react-redux'
import { setUserData } from "./redux/store/userSlice.js"
import { verifyPayment } from "./features/verifyPayment.js"


function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
     const handlePaymentSuccess = async () => {

            const path = window.location.pathname

            // Sirf payment success redirect par chalega
            if (path !== "/payment/success") {
                return
            }

            const params = new URLSearchParams(window.location.search)

            const tracker = params.get("tracker")

            console.log("Payment tracker:", tracker)

            if (!tracker) {
                console.log("Tracker missing")
                window.location.href = "/"
                return
            }

            try {

                // Backend verification
                const result = await verifyPayment(tracker)

                console.log("Payment verification:", result)

                if (result?.success) {

                    console.log("Payment verified successfully")

                    // Fresh user data
                    const userData = await getCurrentUser()

                    // Redux update
                    dispatch(setUserData(userData))

                    // Tracker remove
                    localStorage.removeItem("paymentTracker")

                    // Home par redirect
                    window.location.href = "/"

                } else {

                    console.log("Payment verification failed")

                    window.location.href = "/"
                }

            } catch (error) {

                console.error("Payment verification error:", error)

                window.location.href = "/"
            }
        }

    //fetch current user data in refresh
    const getUser = async () =>{
      const data = await getCurrentUser()
      
      // update user data from redux
      dispatch(setUserData(data))
    }
     if (window.location.pathname === "/payment/success") {

            handlePaymentSuccess()

        } else {
    getUser()
        }
  },[dispatch]);
  

  return (
    <>
    <Home/>
   
    
    </>
  )
}

export default App