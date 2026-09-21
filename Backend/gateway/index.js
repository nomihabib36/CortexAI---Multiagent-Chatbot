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
app.use("/api/billing",protect,proxyWithHeader(process.env.BILLING_SERVICE))
app.use("/api/agent",protect,proxyWithHeader(process.env.AGENT_SERVICE))
app.get("/api/me",protect, getCurrentUser)
app.get("/",(req,res)=>{
    res.json({"msg":"Gateway"})
})

//SafePay redirect
app.get("/payment/success", (req, res) => {
    // console.log("PAYMENT SUCCESS");
    // console.log("Query:", req.query);
    const { tracker } = req.query; // confirm actual param name first

    // redirect to frontend, passing tracker along
    return  res.redirect(`http://localhost:5173/payment/success?tracker=${tracker}`);
    // console.log("Query:", req.query)

    // res.send("Payment successful");
});

app.get("/payment/cancel", (req, res) => {
    console.log("PAYMENT CANCELLED");
    console.log("Query:", req.query);

    res.send("Payment cancelled");
});

app.listen(port,()=>{
    console.log(`Gateway Running on ${port}`);
    
})
