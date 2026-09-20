import api from "../../utils/axios.js"
export const verifyPayment = async(tracker)=>{
        try {
            const {data} = await api.post("/api/billing/verify", {tracker})
            return data
            
        } catch (error) {

            console.log(error);
            return []
            
        }
}