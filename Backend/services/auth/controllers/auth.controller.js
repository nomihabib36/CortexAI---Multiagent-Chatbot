import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";
import { json } from "stream/consumers";
import { log } from "console";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `user-session-${user._id}`,
      sessionId,
      "EX",
      7 * 24 * 60 * 60,
    );

    //set/Store session in Redis
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
    // console.log(`user are ${user}`);
  } catch (error) {
    return res.status(500).json({
      message: `login error ${error}`,
    });
  }
};

//Logout Controller

export const logout = async (req, res) => {
  try {
    //Delete Session from Redis
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`);

    //Delete Session From Cookies
    res.clearCookie("session");
    return res.status(200).json({ message: `logout Successfull` });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};

export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits } = req.body;
    const userId = "6a919af854686192bbdde561";
    const user = await User.findById(userId);
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }
    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    console.log("Before save:", user.plan, user.credits);
    await user.save();
    console.log("After save:", user.plan, user.credits);

    const sessionId = await redis.get(`user-session-${user._id}`);
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `updateUserPayment Error: ${error}` });
  }
};

export const deductCredits = async (req, res) => {
  try {
    const {userId, agent} = req.body    
    const COST = {
      chat:   1,
      search: 5,
      coding: 10,
      pdf:    10,
      ppt:    10,
      vision:  10
    }

    const user = await User.findById(userId)
    
    if(!userId){
      return res.status(400).json({err:`user not found`})
    }
    const requiredCredit = COST[agent] || 1
    if(user.credits<requiredCredit){
      return res.status(400).json({err:`not enough credits`})
    }
    user.credits-=requiredCredit

    await user.save()

     const sessionId = await redis.get(`user-session-${user._id}`);
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({ success: true });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: `deductCredit Error: ${error}` });

  }
};
