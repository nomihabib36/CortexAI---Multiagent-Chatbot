import express from 'express';
import connectDB from './config/db.js';
import router from './routers/agent.route.js';
import dotenv from 'dotenv';
dotenv.config()


const port = process.env.PORT

const app = express();
app.use(express.json())
app.use("/", router)

app.get("/",(req,res)=>{
    try {
        return res.status(200).json({Message:`Wellcome to Agent Service`})
    } catch (error) {
        return res.status(500).json({ErrorMessage:`${error}`})
        
    }
})

app.listen(port,()=>{
    console.log(`app server is running at http://localhost:${port}`);
    connectDB()
})