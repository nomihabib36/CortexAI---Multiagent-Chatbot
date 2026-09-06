import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { getCurrentUser } from "./controller/user.contollers.js";
import protect from "./middleware/auth.middleware.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
import morgan from "morgan";
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxy(process.env.AGENT_SERVICE))
app.get("/api/me",protect, getCurrentUser)
app.get("/",(req,res)=>{
    res.json({"msg":"Gateway"})
})

app.listen(port,()=>{
    console.log(`Gateway Running on ${port}`);
    
})
