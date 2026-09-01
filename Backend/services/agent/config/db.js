import mongoose from 'mongoose';
import dns from "node:dns";

// Use Google or Cloudflare DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]); 


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database COnnection successfull`);
        
    } catch (error) {
        console.log(`DB COnnection error ${error}`);
        
    }
}

export default connectDB
