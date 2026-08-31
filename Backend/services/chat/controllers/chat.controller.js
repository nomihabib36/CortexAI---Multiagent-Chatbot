import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req,res)=>{
    try {
        //get userid from header
        const userId = req.headers["x-user-id"]
        console.log(userId);

        //create conversation with user id
        const conversation = await Conversation.create({
            userId: userId
        })

        return res.status(200).json({message:`create Conversation Successfull ${conversation}`})
        
        
    } catch (error) {
        return res.status(500).json({createConversationError:error})
    }
}

export const getConversations = async (req,res)=>{
    try {
        //get userid from header
        const userId = req.headers["x-user-id"]
        console.log(userId);

        //get conversations with user id
        const conversations = await Conversation.find({
            userId: userId
        }).sort({updatedAt:-1})

        return res.status(200).json({message:`Fetching Conversations ${conversations}`})
        
        
    } catch (error) {
        return res.status(500).json({getConversationError:error})
    }
}
export const updateConversation = async (req,res)=>{
    try {
        //get id and title from body
        const {id, title} = req.body

        //Update conversation
        const conversation = await Conversation.findByIdAndUpdate(id,{
            title
        })

        return res.status(200).json({message:`update Conversation Successfull ${conversation}`})
        
        
    } catch (error) {
        return res.status(500).json({updateConversationError:error})
    }
}

export const saveMessage = async (req,res)=>{
    try {
        //get conversation id, role, content from frontend
        const {conversationId, role, content} = req.body;


        //Save Message
        const message = await Message.create({
            conversationId,
            role,
            content
        })

        return res.status(200).json({message:`Save Message Successfull ${message}`})
        
        
    } catch (error) {
        return res.status(500).json({saveMessageError:error})
    }
}

export const getMessages = async (req,res)=>{
    try {
        //get conversation id from params
        const conversationId = req.params.conversatinId


        //Save Message
        const messages = await Message.find({
            conversationId,
        }).sort({createdAt:-1})

        return res.status(200).json({message:`get Message Successfull ${messages}`})
        
        
    } catch (error) {
        return res.status(500).json({getMessagesError:error})
    }
}