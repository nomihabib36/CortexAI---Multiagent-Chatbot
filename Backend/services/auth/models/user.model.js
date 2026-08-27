import mongoose from "mongoose";
import { useReducer } from "react";

const userSchema = new mongoose.Schema({
    firebaseUid:{
        type: String,
        unique: true
    },
    name: String,
    email: String,
    avatar: String
}
    ,{
        timestamps: true
    })

export const User = mongoose.model("User",userSchema)