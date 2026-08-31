import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config()


const app = express();
const port = process.env.PORT

app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).json({message:`Wellcome to Chat server`})
})
app.listen(port,()=>{
    console.log(`chat server Running at port http://localhost:${port}`);
    connectDB()
    
})