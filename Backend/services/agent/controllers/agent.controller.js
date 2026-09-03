import axios from 'axios'
import { graph } from '../graph/graph.js'

export const agent = async (req,res)=>{
    try {
        const {prompt} = req.body
        //Save Message Api from CHAT Service
        await axios.post(`${process.env.CHAT_SERVICE/save-message}`,{
            //Saving Message in that structure
            conversationId, role:"user", content :"prompt"
        })

        //Called Graph - Start Graph from here

        const result = await graph.invoke({
            prompt, conversationId
        })

        const response = result.aiResponse
        return res.statun(200).json({ResponseFromAgentServiceController:
            `${response}`})
        } catch (error) {
        return res.statun(500).json({ErrorAgentServiceController:`${error}`})
        
    }
}