import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './router/router.js'
dotenv.config()


const app = express()
const port = process.env.PORT
app.use(express.json())
app.use("/", router)
app.get("/",(req,res)=>{
    res.status(200).json({msg:`welcome to billing`})
})

app.listen(port ,()=>{
    console.log(`server running on https://localhost:${port}`);
    connectDB()
    
})