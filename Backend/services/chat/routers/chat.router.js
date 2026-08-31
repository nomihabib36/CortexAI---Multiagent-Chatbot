import express from 'express'
import { createConversation, getConversations, getMessage, saveMessage, updateConversation } from '../controllers/chat.controller.js'

const router = express.Router()

router.get("/create-conversation", createConversation)
router.post("/get-conversation", getConversations)
router.get("/update-conversation", updateConversation)
router.post("/save-message", saveMessage)
router.get("/get-messages", getMessages)
