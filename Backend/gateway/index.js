import express from "express";
import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT
const app = express()

app.get("/",(req,res)=>{
    res.json({"msg":"Gateway"})
})

app.listen(port,()=>{
    console.log(`Gateway Running on ${port}`);
    
})
