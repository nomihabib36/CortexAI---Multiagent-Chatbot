import axios from 'axios'
import { graph } from '../graph/graph.js'
import { addMessage } from '../config/memory.js'

export const agent = async (req,res)=>{
    try {
        const {prompt,conversationId, agent} = req.body

        //Save Message Api from CHAT Service
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            //Saving Message in that structure
            conversationId, role:"user", content :prompt
        })

        //Called Graph - Start Graph from here

        const result = await graph.invoke({
            prompt, conversationId, agent
        })

        const response = result.aiResponse


        await addMessage(conversationId, "user", prompt)
        
        await addMessage(conversationId, "assistant", response)

        
        // Save ai response in db
        
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"assistant", content:response
        })
        

        return res.status(200).json(response)
        
        } catch (error) {


        console.log(error);
        
        
    }
}