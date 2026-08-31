import api from "../../utils/axios.js";

// Fetch Current User
const getCurrentUser = async () => {
    try {
        const {data} = await api.get("/api/me")
        return data
        
    } catch (error) {
        console.log(`feature getCurrentUser error ${error}`);
        
    }
}

export default getCurrentUser