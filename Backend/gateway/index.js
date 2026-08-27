import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT
const app = express()

app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.get("/",(req,res)=>{
    res.json({"msg":"Gateway"})
})

app.listen(port,()=>{
    console.log(`Gateway Running on ${port}`);
    
})
