import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())
app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.get("/",(req,res)=>{
    res.json({"msg":"Gateway"})
})

app.listen(port,()=>{
    console.log(`Gateway Running on ${port}`);
    
})
